// Decorative temple divider with SVG lotus motif and gold lines
const TempleDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 my-2 ${className}`}>
    {/* Left gold line */}
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-primary/30" />
    
    {/* Elegant SVG Lotus Motif */}
    <div className="flex items-center justify-center text-primary/80 drop-shadow-sm px-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-110 transition-transform duration-500">
        <path d="M12 22C12 22 15 18 15 13C15 8 12 2 12 2C12 2 9 8 9 13C9 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M12 22C12 22 17 21 20 16C23 11 23 7 23 7C23 7 19 8 16 12C13 16 12 22 12 22Z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M12 22C12 22 7 21 4 16C1 11 1 7 1 7C1 7 5 8 8 12C11 16 12 22 12 22Z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M13 22C13 22 20 23 23 20C26 17 25 13 25 13C25 13 21 15 18 18C15 21 13 22 13 22Z" fill="currentColor" fillOpacity="0.4"/>
        <path d="M11 22C11 22 4 23 1 20C-2 17 -1 13 -1 13C-1 13 3 15 6 18C9 21 11 22 11 22Z" fill="currentColor" fillOpacity="0.4"/>
        <circle cx="12" cy="22" r="1.5" fill="currentColor"/>
      </svg>
    </div>

    {/* Right gold line */}
    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/60 to-primary/30" />
  </div>
);

// Decorative corner ornament — place in section headings
export const CornerOrnament = () => (
  <div className="flex items-center justify-center gap-3 text-primary/70 mb-3 opacity-80">
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -scale-x-100">
      <path d="M24 6C18 6 13 4 12 0C11 4 6 6 0 6C6 6 11 8 12 12C13 8 18 6 24 6Z" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="background" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
    </svg>
    <span className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent inline-block" />
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6C18 6 13 4 12 0C11 4 6 6 0 6C6 6 11 8 12 12C13 8 18 6 24 6Z" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="background" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
    </svg>
  </div>
);

// Diya flame decoration row
export const DiyaRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex justify-center gap-4 my-3">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className="text-2xl select-none"
        style={{ animation: `diya-flicker ${1.4 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
        title="Diya"
      >
        🪔
      </span>
    ))}
  </div>
);

export default TempleDivider;
