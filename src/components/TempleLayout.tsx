import type { ReactNode } from "react";

interface TempleLayoutProps {
  children: ReactNode;
  watermark?: string;
}

const TempleLayout = ({ children, watermark = "om" }: TempleLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
        <span className="text-[300px] font-serif select-none text-primary">{watermark}</span>
      </div>
      
      {/* Subtle mandala pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, hsl(45 95% 50%) 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, hsl(45 95% 50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TempleLayout;
