export default function LoadingCube({ size = 32 }: { size?: number }) {
  const half = size / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: "rotateX(-45deg) rotateY(45deg)",
        animation: "cube-rotate 3s infinite linear",
      }}
    >
      <style>{`
        @keyframes cube-rotate {
          0% { transform: rotateX(-45deg) rotateY(45deg) rotateZ(0deg); }
          16.66% { transform: rotateX(-45deg) rotateY(-45deg) rotateZ(0deg); }
          33.32% { transform: rotateX(-135deg) rotateY(0deg) rotateZ(-45deg); }
          50% { transform: rotateX(-135deg) rotateY(0deg) rotateZ(-135deg); }
          66.67% { transform: rotateX(-225deg) rotateY(45deg) rotateZ(-90deg); }
          83.33% { transform: rotateX(-225deg) rotateY(135deg) rotateZ(-90deg); }
          100% { transform: rotateX(-225deg) rotateY(135deg) rotateZ(-180deg); }
        }
      `}</style>

      <CubeFace bg="#fd8308" transform={`rotateY(0deg) translateZ(${half}px)`} size={size} />
      <CubeFace bg="#fef1d2" transform={`rotateY(180deg) translateZ(${half}px)`} size={size} />
      <CubeFace bg="#ffb05f" transform={`rotateY(90deg) translateZ(${half}px)`} size={size} />
      <CubeFace bg="#ffb05f" transform={`rotateY(-90deg) translateZ(${half}px)`} size={size} />
      <CubeFace bg="#fdddb4" transform={`rotateX(90deg) translateZ(${half}px)`} size={size} />
      <CubeFace bg="#ffc38e" transform={`rotateX(-90deg) translateZ(${half}px)`} size={size} />
    </div>
  );
}

function CubeFace({ bg, transform, size }: { bg: string; transform: string; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: bg,
        transform,
      }}
    />
  );
}