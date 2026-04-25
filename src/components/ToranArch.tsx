const ToranArch = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-20 pointer-events-none overflow-hidden opacity-40">
      {/* Toran arch decoration */}
      <svg viewBox="0 0 800 80" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="toranGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Arch curve */}
        <path
          d="M 100 80 Q 400 -20 700 80"
          fill="none"
          stroke="url(#toranGrad)"
          strokeWidth="2"
        />
        {/* Decorative elements along arch */}
        {[150, 250, 350, 450, 550, 650].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={35 + Math.sin((i * Math.PI) / 3) * 20} r="6" fill="#FFD700" opacity="0.6" />
            <circle cx={x} cy={35 + Math.sin((i * Math.PI) / 3) * 20} r="3" fill="#FFA500" />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ToranArch;
