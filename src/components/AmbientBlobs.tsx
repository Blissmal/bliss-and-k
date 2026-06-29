export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-left — blue */}
      <div
        className="absolute top-[-15%] left-[-12%] w-[700px] h-[700px] rounded-full opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, rgba(60,80,224,0.55) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />
      {/* Mid-right — purple */}
      <div
        className="absolute top-[35%] right-[-8%] w-[550px] h-[550px] rounded-full opacity-[0.14]"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />
      {/* Bottom-center — orange */}
      <div
        className="absolute bottom-[5%] left-[25%] w-[450px] h-[450px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.45) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />
      {/* Top-right micro dot */}
      <div
        className="absolute top-[10%] right-[20%] w-[200px] h-[200px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgba(34,173,92,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
