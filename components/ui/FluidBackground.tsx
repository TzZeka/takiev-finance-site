"use client";

interface FluidBackgroundProps {
  className?: string;
  baseOpacity?: number; // default 0.09
}

export function FluidBackground({ className = "", baseOpacity = 0.09 }: FluidBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Teal orb */}
      <div
        className="fluid-orb-a absolute rounded-full blur-[120px]"
        style={{
          width: "55%",
          height: "55%",
          top: "5%",
          left: "-10%",
          backgroundColor: "#19BFB7",
          opacity: baseOpacity,
        }}
      />
      {/* Emerald orb */}
      <div
        className="fluid-orb-b absolute rounded-full blur-[100px]"
        style={{
          width: "50%",
          height: "50%",
          bottom: "5%",
          right: "-5%",
          backgroundColor: "#10b981",
          opacity: baseOpacity,
        }}
      />
      {/* Teal-dark orb */}
      <div
        className="fluid-orb-c absolute rounded-full blur-[140px]"
        style={{
          width: "40%",
          height: "40%",
          top: "40%",
          left: "30%",
          backgroundColor: "#0d9488",
          opacity: baseOpacity * 0.7,
        }}
      />
      {/* Emerald-light orb */}
      <div
        className="fluid-orb-d absolute rounded-full blur-[90px]"
        style={{
          width: "35%",
          height: "35%",
          top: "-5%",
          right: "20%",
          backgroundColor: "#34d399",
          opacity: baseOpacity * 0.6,
        }}
      />
    </div>
  );
}
