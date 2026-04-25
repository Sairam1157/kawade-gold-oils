import { motion } from "framer-motion";

// Floating Lotus Particles
export const FloatingLotus = () => {
  const lotusPositions = [
    { left: "5%", top: "10%", delay: 0, duration: 8 },
    { left: "15%", top: "60%", delay: 2, duration: 10 },
    { left: "85%", top: "20%", delay: 1, duration: 9 },
    { left: "75%", top: "70%", delay: 3, duration: 11 },
    { left: "25%", top: "80%", delay: 4, duration: 12 },
    { left: "90%", top: "50%", delay: 2.5, duration: 10 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {lotusPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C10.5 4 9 6 9 8c0 2.5 1.5 4 3 4s3-1.5 3-4c0-2-1.5-4-3-6zm-7 7c-1 2-1 4 0 6 1.5 2 4 2 5 0 1-2 0-4-2-5-1.5-1-3-1-3-1zm14 0c0 0-1.5 0-3 1-2 1-3 3-2 5 1 2 3.5 2 5 0 1-2 1-4 0-6zm-7 8c-2.5 0-5 2-5 5 0 2 2 3 5 3s5-1 5-3c0-3-2.5-5-5-5z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Divine Light Rays
export const DivineLightRays = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
          style={{
            left: `${12.5 + i * 12}%`,
            transformOrigin: "top center",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// Sanskrit Blessing Text
export const SanskritBlessing = ({ text = "ॐ शांति शांति शांति", className = "" }: { text?: string; className?: string }) => {
  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center justify-center gap-3">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary/60"
        >
          &#10047;
        </motion.span>
        <p className="text-lg italic text-primary font-bold" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
          {text}
        </p>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="text-primary/60"
        >
          &#10047;
        </motion.span>
      </div>
    </motion.div>
  );
};

// Sacred Border Frame
export const SacredFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
      
      {/* Center dots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
      
      {children}
    </div>
  );
};

// Animated Diya (Lamp)
export const AnimatedDiya = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Diya base */}
      <div className="w-8 h-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-full" />
      
      {/* Flame */}
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-6"
        animate={{
          scaleY: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.8, 1, 0.7, 1, 0.8],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]" />
      </motion.div>
      
      {/* Glow */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
};

// Sacred Om Symbol with glow
export const SacredOm = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span 
        className="text-6xl text-primary/20 select-none"
        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
      >
        ॐ
      </span>
      <motion.div
        className="absolute inset-0 text-6xl text-primary/10 blur-sm"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
      >
        ॐ
      </motion.div>
    </motion.div>
  );
};

// Divine Section Wrapper
export const DivineSection = ({ 
  children, 
  className = "",
  showLotus = true,
  showLightRays = true,
  showOm = false,
}: { 
  children: React.ReactNode; 
  className?: string;
  showLotus?: boolean;
  showLightRays?: boolean;
  showOm?: boolean;
}) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {showLightRays && <DivineLightRays />}
      {showLotus && <FloatingLotus />}
      {showOm && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <SacredOm />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};
