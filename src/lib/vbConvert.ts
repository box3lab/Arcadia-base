export interface VBProject {
  HEXCOLORS: (string | null)[][];
  PBRATTRBS: any[];
  CURRENTCOLORINDEX: number;
  ENCODEVOXELS: number[] | string | Uint8Array;
  VOXSIZE?: number | number[];
  voxSize?: number | number[];
  SIZE?: number | number[];
  size?: number | number[];
}

export function parseVBProject(data: any): VBProject | null {
  if (!data || !data.ENCODEVOXELS) return null;
  return {
    HEXCOLORS: data.HEXCOLORS || [],
    PBRATTRBS: data.PBRATTRBS || [],
    CURRENTCOLORINDEX: data.CURRENTCOLORINDEX || 0,
    ENCODEVOXELS: data.ENCODEVOXELS,
    VOXSIZE: data.VOXSIZE,
    voxSize: data.voxSize,
    SIZE: data.SIZE,
    size: data.size,
  };
}

function toSafeInt(v: any): number | null {
  const n = Number(v);
  if (!isFinite(n)) return null;
  const t = Math.trunc(n);
  if (t <= 0 || t > 255) return null;
  return t;
}

function normalizeShape(s: any): [number, number, number] | null {
  if (Array.isArray(s) && s.length >= 3) {
    const x = toSafeInt(s[0]), y = toSafeInt(s[1]), z = toSafeInt(s[2]);
    if (x !== null && y !== null && z !== null) return [x, y, z];
    return null;
  }
  const e = toSafeInt(s);
  return e !== null ? [e, e, e] : null;
}

function inferShape(vb: VBProject): [number, number, number] | null {
  const s = vb.VOXSIZE !== undefined ? vb.VOXSIZE
    : vb.voxSize !== undefined ? vb.voxSize
    : vb.SIZE !== undefined ? vb.SIZE
    : vb.size;
  return normalizeShape(s);
}

export function vbDimensions(voxels: number[]): [number, number, number] {
  const len = voxels.length;
  const dim = Math.round(Math.cbrt(len));
  return [dim, dim, dim];
}

interface DecodedVb {
  shape: [number, number, number];
  dense: Uint16Array;
  palette: (string | null)[];
}

function decodeVb(vb: VBProject): DecodedVb {
  const raw = decodeEncodeVoxels(vb.ENCODEVOXELS);
  const decoded = decodeVdEncodedVoxels(raw);
  const declaredShape = inferShape(vb);
  const shape: [number, number, number] = declaredShape || decoded.size;
  const palette = getVbPalette(vb);
  return { shape, dense: decoded.voxels, palette };
}

export function vbNonZeroCount(vb: VBProject): number {
  const { dense } = decodeVb(vb);
  let c = 0;
  for (let i = 0; i < dense.length; i++) { if (dense[i] !== 0) c++; }
  return c;
}

export function vbGetSize(vb: VBProject): [number, number, number] {
  const { shape } = decodeVb(vb);
  return shape;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function normalizeHex(hex: string): string {
  const e = hex.trim().replace(/^#/, "");
  if (e.length === 3) return e[0] + e[0] + e[1] + e[1] + e[2] + e[2];
  return e;
}

function hexToRgba(hex: string | null): [number, number, number, number] {
  if (!hex) return [0, 0, 0, 255];
  const e = normalizeHex(hex);
  if (e.length < 6) return [0, 0, 0, 255];
  const r = parseInt(e.slice(0, 2), 16);
  const g = parseInt(e.slice(2, 4), 16);
  const b = parseInt(e.slice(4, 6), 16);
  const a = e.length >= 8 ? parseInt(e.slice(6, 8), 16) : 255;
  return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b, isNaN(a) ? 255 : a];
}

function getVbPalette(vb: VBProject): (string | null)[] {
  const idx = Math.min(vb.CURRENTCOLORINDEX || 0, vb.HEXCOLORS.length - 1);
  return vb.HEXCOLORS[idx] || vb.HEXCOLORS[0] || [];
}

function decodeBase64ToBytes(str: string): Uint8Array {
  const bin = atob(str);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

function parseByteString(str: string): Uint8Array {
  const e = str.trim();
  if (!e) return new Uint8Array(0);
  if (e.charAt(0) === "[" && e.charAt(e.length - 1) === "]") {
    const n = JSON.parse(e);
    return Uint8Array.from(n.map((c: number) => c & 255));
  }
  if (e.indexOf(",") >= 0) {
    return Uint8Array.from(e.split(",").map((n: string) => parseInt(n.trim(), 10)).filter((n: number) => isFinite(n)).map((n: number) => n & 255));
  }
  if (/^[0-9a-fA-F]+$/.test(e) && e.length % 2 === 0) {
    const arr = new Uint8Array(e.length / 2);
    for (let i = 0; i < e.length; i += 2) arr[i / 2] = parseInt(e.slice(i, i + 2), 16);
    return arr;
  }
  return decodeBase64ToBytes(e);
}

function decodeEncodeVoxels(encoded: any): Uint8Array {
  if (encoded instanceof Uint8Array) return encoded;
  if (encoded instanceof ArrayBuffer) return new Uint8Array(encoded);
  if (Array.isArray(encoded)) return Uint8Array.from(encoded.map((e: number) => Number(e) & 255));
  if (typeof encoded === "string") return parseByteString(encoded);
  return Uint8Array.from(Object.values(encoded).map((e: any) => Number(e) & 255));
}

class ByteReader {
  private bytes: Uint8Array;
  private offset: number = 0;
  constructor(bytes: Uint8Array) { this.bytes = bytes; }
  hasMore(): boolean { return this.offset < this.bytes.length; }
  ensure(n: number) { if (this.offset + n > this.bytes.length) throw new Error("Unexpected end of ENCODEVOXELS"); }
  readInt32LE(): number {
    this.ensure(4);
    const a = this.bytes[this.offset], b = this.bytes[this.offset + 1], c = this.bytes[this.offset + 2], d = this.bytes[this.offset + 3];
    this.offset += 4;
    return (a | b << 8 | c << 16 | d << 24) >>> 0;
  }
  readVarint(): number {
    let shift = 0, result = 0;
    for (let i = 0; i < 5; i++) {
      this.ensure(1);
      const b = this.bytes[this.offset++];
      result |= (b & 127) << shift;
      if (b < 128) return result >>> 0;
      shift += 7;
    }
    throw new Error("Invalid varint in ENCODEVOXELS");
  }
}

function decodeVdEncodedVoxels(bytes: Uint8Array): { size: [number, number, number]; voxels: Uint16Array } {
  const reader = new ByteReader(bytes);
  const nx = reader.readInt32LE();
  const ny = reader.readInt32LE();
  const nz = reader.readInt32LE();
  if (nx <= 0 || ny <= 0 || nz <= 0) throw new Error("Invalid voxel size: " + nx + "x" + ny + "x" + nz);
  const total = nx * ny * nz;
  const voxels = new Uint16Array(total);
  if (!reader.hasMore()) return { size: [nx, ny, nz], voxels };
  let pos = 0;
  while (pos < total && reader.hasMore()) {
    const runLen = reader.readVarint() + 1;
    const value = reader.readVarint();
    const end = Math.min(pos + runLen, total);
    for (; pos < end; pos++) voxels[pos] = value;
  }
  return { size: [nx, ny, nz], voxels };
}

function rotateCoord90AroundX(shape: [number, number, number], x: number, y: number, z: number): [number, number, number] {
  return [x, shape[2] - 1 - z, y];
}

function getRotatedShape(shape: [number, number, number]): [number, number, number] {
  return [shape[0], shape[2], shape[1]];
}

function decodeVoxels(dense: Uint16Array, shape: [number, number, number]): { shape: [number, number, number]; voxels: Array<{ x: number; y: number; z: number; i: number }> } {
  const nx = shape[0], ny = shape[1], nz = shape[2];
  const rotatedShape = getRotatedShape(shape);
  const result: Array<{ x: number; y: number; z: number; i: number }> = [];
  const total = nx * ny * nz;
  for (let idx = 0; idx < total && idx < dense.length; idx++) {
    const v = dense[idx];
    if (v === 0) continue;
    const x = idx % nx;
    const y = Math.floor(idx / nx) % ny;
    const z = Math.floor(idx / (nx * ny));
    const [rx, ry, rz] = rotateCoord90AroundX(shape, x, y, z);
    result.push({ x: rx, y: ry, z: rz, i: Math.max(1, Math.min(255, v)) });
  }
  return { shape: rotatedShape, voxels: result };
}

export function vbToVox(vb: VBProject): Uint8Array {
  const raw = decodeEncodeVoxels(vb.ENCODEVOXELS);
  const decoded = decodeVdEncodedVoxels(raw);
  const declaredShape = inferShape(vb);
  const shape: [number, number, number] = declaredShape || decoded.size;

  const palette = getVbPalette(vb);
  const { shape: voxShape, voxels: voxelList } = decodeVoxels(decoded.voxels, shape);
  const [vx, vy, vz] = voxShape;

  const numVoxels = voxelList.length;
  const sizeContentBytes = 12;
  const xyziContentBytes = 4 + numVoxels * 4;
  const rgbaContentBytes = 256 * 4;

  const sizeChunkBytes = 12 + sizeContentBytes;
  const xyziChunkBytes = 12 + xyziContentBytes;
  const rgbaChunkBytes = 12 + rgbaContentBytes;
  const mainChildrenBytes = sizeChunkBytes + xyziChunkBytes + rgbaChunkBytes;

  const totalBytes = 8 + 12 + mainChildrenBytes;
  const buf = new ArrayBuffer(totalBytes);
  const dv = new DataView(buf);
  const u8 = new Uint8Array(buf);
  let p = 0;

  function w4cc(s: string) { for (let i = 0; i < 4; i++) u8[p++] = s.charCodeAt(i); }
  function wU32(v: number) { dv.setUint32(p, v, true); p += 4; }

  w4cc("VOX ");
  wU32(150);

  w4cc("MAIN");
  wU32(0);
  wU32(mainChildrenBytes);

  w4cc("SIZE");
  wU32(sizeContentBytes);
  wU32(0);
  wU32(vx);
  wU32(vy);
  wU32(vz);

  w4cc("XYZI");
  wU32(xyziContentBytes);
  wU32(0);
  wU32(numVoxels);
  for (const v of voxelList) {
    u8[p++] = v.x & 0xFF;
    u8[p++] = v.y & 0xFF;
    u8[p++] = v.z & 0xFF;
    u8[p++] = v.i & 0xFF;
  }

  w4cc("RGBA");
  wU32(rgbaContentBytes);
  wU32(0);
  for (let i = 0; i < 256; i++) {
    const hex = palette[i + 1] || null;
    const [r, g, b, a] = hexToRgba(hex);
    u8[p++] = r; u8[p++] = g; u8[p++] = b; u8[p++] = a;
  }

  return new Uint8Array(buf);
}

export function vbToObj(vb: VBProject): string {
  const { shape, dense, palette } = decodeVb(vb);
  const [sx, sy, sz] = shape;
  const lines: string[] = ["# ArcadiaBase .vb -> .obj conversion"];

  const vertices: string[] = [];
  const faces: string[] = [];
  let vOffset = 0;

  const dirs = [
    { dx: 1, dy: 0, dz: 0 },
    { dx: -1, dy: 0, dz: 0 },
    { dx: 0, dy: 1, dz: 0 },
    { dx: 0, dy: -1, dz: 0 },
    { dx: 0, dy: 0, dz: 1 },
    { dx: 0, dy: 0, dz: -1 },
  ];

  for (let z = 0; z < sz; z++) {
    for (let y = 0; y < sy; y++) {
      for (let x = 0; x < sx; x++) {
        const val = dense[x + y * sx + z * sx * sy];
        if (val === 0) continue;

        const hex = palette[val];
        if (hex && hex !== null) {
          lines.push(`usemtl color_${val}`);
        }

        for (const d of dirs) {
          const nx = x + d.dx, ny = y + d.dy, nz = z + d.dz;
          if (nx >= 0 && nx < sx && ny >= 0 && ny < sy && nz >= 0 && nz < sz) {
            const nv = dense[nx + ny * sx + nz * sx * sy];
            if (nv !== 0) continue;
          }

          const bx = x, by = y, bz = z;

          if (d.dx === 1) {
            vertices.push(`v ${bx + 1} ${by} ${bz}`, `v ${bx + 1} ${by + 1} ${bz}`, `v ${bx + 1} ${by + 1} ${bz + 1}`, `v ${bx + 1} ${by} ${bz + 1}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          } else if (d.dx === -1) {
            vertices.push(`v ${bx} ${by} ${bz}`, `v ${bx} ${by} ${bz + 1}`, `v ${bx} ${by + 1} ${bz + 1}`, `v ${bx} ${by + 1} ${bz}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          } else if (d.dy === 1) {
            vertices.push(`v ${bx} ${by + 1} ${bz}`, `v ${bx} ${by + 1} ${bz + 1}`, `v ${bx + 1} ${by + 1} ${bz + 1}`, `v ${bx + 1} ${by + 1} ${bz}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          } else if (d.dy === -1) {
            vertices.push(`v ${bx} ${by} ${bz + 1}`, `v ${bx} ${by} ${bz}`, `v ${bx + 1} ${by} ${bz}`, `v ${bx + 1} ${by} ${bz + 1}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          } else if (d.dz === 1) {
            vertices.push(`v ${bx} ${by} ${bz + 1}`, `v ${bx + 1} ${by} ${bz + 1}`, `v ${bx + 1} ${by + 1} ${bz + 1}`, `v ${bx} ${by + 1} ${bz + 1}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          } else if (d.dz === -1) {
            vertices.push(`v ${bx + 1} ${by} ${bz}`, `v ${bx} ${by} ${bz}`, `v ${bx} ${by + 1} ${bz}`, `v ${bx + 1} ${by + 1} ${bz}`);
            faces.push(`f ${vOffset + 1} ${vOffset + 2} ${vOffset + 3} ${vOffset + 4}`);
            vOffset += 4;
          }
        }
      }
    }
  }

  for (let i = 0; i < vertices.length; i++) lines.push(vertices[i]);
  for (let i = 0; i < faces.length; i++) lines.push(faces[i]);
  return lines.join("\n");
}

export function vbToStl(vb: VBProject): string {
  const { shape, dense } = decodeVb(vb);
  const [sx, sy, sz] = shape;
  const lines: string[] = ["solid vbproject"];

  const dirs = [
    { dx: 1, dy: 0, dz: 0, nx: 1, ny: 0, nz: 0 },
    { dx: -1, dy: 0, dz: 0, nx: -1, ny: 0, nz: 0 },
    { dx: 0, dy: 1, dz: 0, nx: 0, ny: 1, nz: 0 },
    { dx: 0, dy: -1, dz: 0, nx: 0, ny: -1, nz: 0 },
    { dx: 0, dy: 0, dz: 1, nx: 0, ny: 0, nz: 1 },
    { dx: 0, dy: 0, dz: -1, nx: 0, ny: 0, nz: -1 },
  ];

  for (let z = 0; z < sz; z++) {
    for (let y = 0; y < sy; y++) {
      for (let x = 0; x < sx; x++) {
        const val = dense[x + y * sx + z * sx * sy];
        if (val === 0) continue;

        for (const d of dirs) {
          const nx = x + d.dx, ny = y + d.dy, nz = z + d.dz;
          if (nx >= 0 && nx < sx && ny >= 0 && ny < sy && nz >= 0 && nz < sz) {
            if (dense[nx + ny * sx + nz * sx * sy] !== 0) continue;
          }

          lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
          lines.push("  outer loop");

          const bx = x, by = y, bz = z;
          if (d.dx === 1) {
            lines.push(`    vertex ${bx + 1} ${by} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz + 1}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx + 1} ${by} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz + 1}`);
          } else if (d.dx === -1) {
            lines.push(`    vertex ${bx} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz}`);
            lines.push(`    vertex ${bx} ${by} ${bz}`);
          } else if (d.dy === 1) {
            lines.push(`    vertex ${bx} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz}`);
          } else if (d.dy === -1) {
            lines.push(`    vertex ${bx} ${by} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz + 1}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx} ${by} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx} ${by} ${bz + 1}`);
          } else if (d.dz === 1) {
            lines.push(`    vertex ${bx} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz + 1}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx} ${by} ${bz + 1}`);
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz + 1}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz + 1}`);
          } else if (d.dz === -1) {
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz}`);
            lines.push(`    vertex ${bx + 1} ${by} ${bz}`);
            lines.push(`    vertex ${bx} ${by} ${bz}`);
            lines.push("  endloop");
            lines.push("endfacet");
            lines.push(`facet normal ${d.nx} ${d.ny} ${d.nz}`);
            lines.push("  outer loop");
            lines.push(`    vertex ${bx + 1} ${by + 1} ${bz}`);
            lines.push(`    vertex ${bx} ${by} ${bz}`);
            lines.push(`    vertex ${bx} ${by + 1} ${bz}`);
          }

          lines.push("  endloop");
          lines.push("endfacet");
        }
      }
    }
  }

  lines.push("endsolid vbproject");
  return lines.join("\n");
}

export function vbToGlb(vb: VBProject): Uint8Array {
  const { shape, dense, palette } = decodeVb(vb);
  const [sx, sy, sz] = shape;

  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  let vCount = 0;

  const faceData = [
    { dx: 1, dy: 0, dz: 0, n: [1, 0, 0], verts: (bx: number, by: number, bz: number) => [[bx + 1, by, bz], [bx + 1, by + 1, bz], [bx + 1, by + 1, bz + 1], [bx + 1, by, bz + 1]] },
    { dx: -1, dy: 0, dz: 0, n: [-1, 0, 0], verts: (bx: number, by: number, bz: number) => [[bx, by, bz + 1], [bx, by + 1, bz + 1], [bx, by + 1, bz], [bx, by, bz]] },
    { dx: 0, dy: 1, dz: 0, n: [0, 1, 0], verts: (bx: number, by: number, bz: number) => [[bx, by + 1, bz + 1], [bx + 1, by + 1, bz + 1], [bx + 1, by + 1, bz], [bx, by + 1, bz]] },
    { dx: 0, dy: -1, dz: 0, n: [0, -1, 0], verts: (bx: number, by: number, bz: number) => [[bx, by, bz], [bx + 1, by, bz], [bx + 1, by, bz + 1], [bx, by, bz + 1]] },
    { dx: 0, dy: 0, dz: 1, n: [0, 0, 1], verts: (bx: number, by: number, bz: number) => [[bx, by, bz + 1], [bx + 1, by, bz + 1], [bx + 1, by + 1, bz + 1], [bx, by + 1, bz + 1]] },
    { dx: 0, dy: 0, dz: -1, n: [0, 0, -1], verts: (bx: number, by: number, bz: number) => [[bx + 1, by + 1, bz], [bx + 1, by, bz], [bx, by, bz], [bx, by + 1, bz]] },
  ];

  for (let z = 0; z < sz; z++) {
    for (let y = 0; y < sy; y++) {
      for (let x = 0; x < sx; x++) {
        const val = dense[x + y * sx + z * sx * sy];
        if (val === 0) continue;

        let r = 128, g = 128, b = 128;
        const hex = palette[val];
        if (hex && hex !== null) { [r, g, b] = hexToRgb(hex); }

        for (const face of faceData) {
          const nx = x + face.dx, ny = y + face.dy, nz = z + face.dz;
          if (nx >= 0 && nx < sx && ny >= 0 && ny < sy && nz >= 0 && nz < sz) {
            if (dense[nx + ny * sx + nz * sx * sy] !== 0) continue;
          }

          const vs = face.verts(x, y, z);
          for (const v of vs) {
            positions.push(v[0], v[1], v[2]);
            normals.push(face.n[0], face.n[1], face.n[2]);
            colors.push(r / 255, g / 255, b / 255);
          }
          indices.push(vCount, vCount + 1, vCount + 2, vCount, vCount + 2, vCount + 3);
          vCount += 4;
        }
      }
    }
  }

  const posF32 = new Float32Array(positions);
  const nrmF32 = new Float32Array(normals);
  const colF32 = new Float32Array(colors);
  const idxU32 = new Uint32Array(indices);

  function pad4(n: number) { return (n + 3) & ~3; }

  const posLen = pad4(posF32.byteLength);
  const nrmLen = pad4(nrmF32.byteLength);
  const colLen = pad4(colF32.byteLength);
  const idxLen = pad4(idxU32.byteLength);

  function makeAccessor(bufView: number, byteOffset: number, compType: number, count: number, type: string, min?: number[], max?: number[]) {
    const a: any = { bufferView: bufView, byteOffset, componentType: compType, count, type };
    if (min) a.min = min;
    if (max) a.max = max;
    return a;
  }

  const gltf = {
    asset: { version: "2.0", generator: "ArcadiaBase" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1, COLOR_0: 2 }, indices: 0, material: 0 }] }],
    materials: [{ pbrMetallicRoughness: { metallicFactor: 0, roughnessFactor: 1 } }],
    accessors: [
      makeAccessor(0, 0, 5126, vCount, "VEC3"),
      makeAccessor(1, 0, 5126, vCount, "VEC3"),
      makeAccessor(2, 0, 5126, vCount, "VEC3"),
      makeAccessor(3, 0, 5125, indices.length, "SCALAR"),
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: posF32.byteLength, target: 34962 },
      { buffer: 0, byteOffset: posLen, byteLength: nrmF32.byteLength, target: 34962 },
      { buffer: 0, byteOffset: posLen + nrmLen, byteLength: colF32.byteLength, target: 34962 },
      { buffer: 0, byteOffset: posLen + nrmLen + colLen, byteLength: idxU32.byteLength, target: 34963 },
    ],
    buffers: [{ byteLength: posLen + nrmLen + colLen + idxLen }],
  };

  const jsonStr = JSON.stringify(gltf);
  const jsonPadded = jsonStr + " ".repeat((4 - (jsonStr.length % 4)) % 4);
  const jsonBuf = new TextEncoder().encode(jsonPadded);

  const binTotalLen = posLen + nrmLen + colLen + idxLen;
  const binPaddedLen = pad4(binTotalLen);

  const glbLen = 12 + 8 + jsonBuf.byteLength + 8 + binPaddedLen;
  const glb = new ArrayBuffer(glbLen);
  const view = new DataView(glb);
  const u8 = new Uint8Array(glb);

  let off = 0;
  view.setUint32(off, 0x46546C67, true); off += 4;
  view.setUint32(off, 2, true); off += 4;
  view.setUint32(off, glbLen, true); off += 4;

  view.setUint32(off, jsonBuf.byteLength, true); off += 4;
  view.setUint32(off, 0x4E4F534A, true); off += 4;
  u8.set(jsonBuf, off); off += jsonBuf.byteLength;

  view.setUint32(off, binPaddedLen, true); off += 4;
  view.setUint32(off, 0x004E4942, true); off += 4;

  const binStart = off;
  u8.set(new Uint8Array(posF32.buffer), off); off += posLen;
  u8.set(new Uint8Array(nrmF32.buffer), off); off += nrmLen;
  u8.set(new Uint8Array(colF32.buffer), off); off += colLen;
  u8.set(new Uint8Array(idxU32.buffer), off); off += idxLen;

  return new Uint8Array(glb);
}