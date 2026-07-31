import { gzip } from "pako";

const VOXEL_ID_BITS = 12;
const VOXEL_CHUNK_SHIFT = 5;
const VOXEL_CHUNK_SIZE = 1 << VOXEL_CHUNK_SHIFT;
const VOXEL_CHUNK_MASK = VOXEL_CHUNK_SIZE - 1;
const VOXEL_CHUNK_VOLUME = VOXEL_CHUNK_SIZE * VOXEL_CHUNK_SIZE * VOXEL_CHUNK_SIZE;
const VOXEL_ROT_SHIFT = 14;
const VOXEL_ROT_MASK = 3;
const VOXEL_ID_MASK = (1 << VOXEL_ID_BITS) - 1;

function voxelByteReader(buf: Uint8Array) {
  let off = 0;
  const len = buf.length;

  function readVarint(): number {
    let c = buf[off++];
    if (c < 128) {
      if (off > len) throw new Error("voxel oob");
      return c;
    }
    let d = buf[off++];
    if (d < 128) {
      if (off > len) throw new Error("voxel oob");
      return (c & 127) | (d << 7);
    }
    let l = buf[off++];
    if (l < 128) {
      if (off > len) throw new Error("voxel oob");
      return (c & 127) | ((d & 127) << 7) | (l << 14);
    }
    let u = buf[off++];
    if (u < 128) {
      if (off > len) throw new Error("voxel oob");
      return (c & 127) | ((d & 127) << 7) | ((l & 127) << 14) | (u << 21);
    }
    let m = buf[off++];
    if (off > len) throw new Error("voxel oob");
    return (c & 127) + ((d & 127) << 7) + ((l & 127) << 14) + ((u & 127) << 21) + m * (1 << 28);
  }

  return { readVarint };
}

function voxelDeinterleave3(a: number): number {
  let e = a & 1227133513;
  e = (e | (e >>> 2)) & 3272356035;
  e = (e | (e >>> 4)) & 251719695;
  e = (e | (e >>> 8)) & 4278190335;
  e = (e | (e >>> 16)) & 1023;
  return (e << 22) >>> 22;
}

function voxelSignDecode(a: number): number {
  return a & 1 ? -((a >> 1) + 1) : a >> 1;
}

interface VoxelBox {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  block: number;
}

function voxelBoxDecompress(buf: Uint8Array): VoxelBox[] {
  const e = voxelByteReader(buf);
  const n = e.readVarint();
  const c = e.readVarint();
  const d: number[] = new Array(n);
  for (let v = 0; v < n; ++v) d[v] = e.readVarint();

  const l: VoxelBox[] = new Array(c);
  let u = 0, m = 0, b = 0;

  for (let v = 0; v < c; ++v) {
    const _ = e.readVarint();
    const T = e.readVarint();
    const C = e.readVarint();
    const K = voxelDeinterleave3(_);
    const I = voxelDeinterleave3(_ >>> 1);
    const O = voxelDeinterleave3(_ >>> 2);
    const q = (voxelSignDecode(K) + u) & VOXEL_CHUNK_MASK;
    const k = (voxelSignDecode(I) + m) & VOXEL_CHUNK_MASK;
    const V = (voxelSignDecode(O) + b) & VOXEL_CHUNK_MASK;
    const $ = voxelDeinterleave3(T);
    const Y = voxelDeinterleave3(T >>> 1);
    const Z = voxelDeinterleave3(T >>> 2);
    const H = $ + q, J = Y + k, ae = Z + V;
    const re = d[C];
    l[v] = { minX: q, minY: k, minZ: V, maxX: H, maxY: J, maxZ: ae, block: re };
    u = q; m = k; b = V;
  }

  return l;
}

function voxelBlitBoxesToChunk(arr: Uint16Array, boxes: VoxelBox[]) {
  for (let n = 0; n < boxes.length; ++n) {
    const box = boxes[n];
    for (let z = box.minZ; z < box.maxZ; ++z) {
      const T = z * VOXEL_CHUNK_SIZE * VOXEL_CHUNK_SIZE;
      for (let y = box.minY; y < box.maxY; ++y) {
        const K = T + y * VOXEL_CHUNK_SIZE;
        for (let x = box.minX; x < box.maxX; ++x) arr[K + x] = box.block;
      }
    }
  }
}

async function fetchAndDecodeVoxelChunk(hash: string, fetchBinary: (h: string) => Promise<Uint8Array>): Promise<Uint16Array> {
  if (!hash) return new Uint16Array(VOXEL_CHUNK_VOLUME);
  const buf = await fetchBinary(hash);
  const boxes = voxelBoxDecompress(buf);
  const chunk = new Uint16Array(VOXEL_CHUNK_VOLUME);
  voxelBlitBoxesToChunk(chunk, boxes);
  return chunk;
}

export interface SparseVoxels {
  shape: number[];
  origin: number[];
  dir: number[];
  stride: number[];
  indices: number[];
  data: number[];
  rot: number[];
}

export async function buildSparseVoxels(
  voxelsData: any,
  fetchBinary: (h: string) => Promise<Uint8Array>,
  onProgress?: (processed: number, total: number) => void
): Promise<SparseVoxels> {
  const shape = voxelsData.shape;
  let shapeX: number, shapeY: number, shapeZ: number;

  if (Array.isArray(shape) && shape.length >= 3) {
    [shapeX, shapeY, shapeZ] = shape;
  } else if (shape && typeof shape === "object") {
    shapeX = shape.x; shapeY = shape.y; shapeZ = shape.z;
  } else {
    throw new Error("无法识别的体素尺寸格式");
  }

  const chunkDimX = Math.ceil(shapeX / VOXEL_CHUNK_SIZE);
  const chunkDimY = Math.ceil(shapeY / VOXEL_CHUNK_SIZE);
  const chunkDimZ = Math.ceil(shapeZ / VOXEL_CHUNK_SIZE);
  const totalChunks = chunkDimX * chunkDimY * chunkDimZ;

  const indices: number[] = [];
  const data: number[] = [];
  const rot: number[] = [];
  let processed = 0;
  const cache: Record<string, Uint16Array> = {};

  for (let cz = 0; cz < chunkDimZ; ++cz) {
    for (let cy = 0; cy < chunkDimY; ++cy) {
      for (let cx = 0; cx < chunkDimX; ++cx) {
        const idx = cx + chunkDimX * (cy + chunkDimY * cz);
        const hash = voxelsData.chunks[idx] || "";
        let chunk: Uint16Array;

        if (cache[hash]) {
          chunk = cache[hash];
        } else {
          try {
            chunk = await fetchAndDecodeVoxelChunk(hash, fetchBinary);
            if (hash) cache[hash] = chunk;
          } catch {
            chunk = new Uint16Array(VOXEL_CHUNK_VOLUME);
          }
        }

        const baseX = cx * VOXEL_CHUNK_SIZE;
        const baseY = cy * VOXEL_CHUNK_SIZE;
        const baseZ = cz * VOXEL_CHUNK_SIZE;
        const limitX = Math.min(VOXEL_CHUNK_SIZE, shapeX - baseX);
        const limitY = Math.min(VOXEL_CHUNK_SIZE, shapeY - baseY);
        const limitZ = Math.min(VOXEL_CHUNK_SIZE, shapeZ - baseZ);

        for (let z = 0; z < limitZ; ++z) {
          const planeOff = z * VOXEL_CHUNK_SIZE * VOXEL_CHUNK_SIZE;
          const worldZ = baseZ + z;
          for (let y = 0; y < limitY; ++y) {
            const rowOff = planeOff + y * VOXEL_CHUNK_SIZE;
            const worldY = baseY + y;
            for (let x = 0; x < limitX; ++x) {
              const val = chunk[rowOff + x];
              const blockId = val & VOXEL_ID_MASK;
              if (blockId === 0) continue;
              const r = (val >>> VOXEL_ROT_SHIFT) & VOXEL_ROT_MASK;
              const worldX = baseX + x;
              const linear = worldX + worldY * shapeX + worldZ * shapeX * shapeY;
              indices.push(linear);
              data.push(blockId);
              rot.push(r);
            }
          }
        }

        processed++;
        if (onProgress) onProgress(processed, totalChunks);
      }
    }
  }

  return {
    shape: [shapeX, shapeY, shapeZ],
    origin: [0, 0, 0],
    dir: [1, 1, 1],
    stride: [1, shapeX, shapeX * shapeY],
    indices,
    data,
    rot,
  };
}

export function compressSparseVoxels(sparse: SparseVoxels): Uint8Array {
  const jsonStr = JSON.stringify(sparse);
  return gzip(jsonStr, { level: 9 });
}