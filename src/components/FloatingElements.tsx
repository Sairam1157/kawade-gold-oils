const FloatingElements = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute top-[15%] left-[8%] w-20 h-20 rounded-full bg-primary/10 animate-float" style={{ animationDuration: "4s" }} />
    <div className="absolute top-[60%] right-[5%] w-14 h-14 rounded-full bg-primary/8 animate-float" style={{ animationDuration: "5s", animationDelay: "1s" }} />
    <div className="absolute bottom-[20%] left-[15%] w-10 h-10 rounded-full bg-accent/10 animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
    <div className="absolute top-[35%] right-[18%] w-6 h-6 rounded-full bg-secondary/10 animate-float" style={{ animationDuration: "4.5s", animationDelay: "2s" }} />
  </div>
);

export default FloatingElements;
