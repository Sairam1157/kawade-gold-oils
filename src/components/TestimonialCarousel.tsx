import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 second auto-scroll
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-14">
      {/* Central stage area */}
      <div className="relative min-h-[380px] md:min-h-[320px] bg-card/60 backdrop-blur-md border-y border-primary/20 md:rounded-[3rem] md:border p-8 md:p-14 shadow-2xl shadow-primary/5 overflow-hidden flex flex-col justify-center">
        {/* Deep ambient glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(234,179,8,0.08)_0%,transparent_60%)] pointer-events-none" />

        {/* Large Decorative Quote Icon */}
        <div className="absolute top-4 left-4 md:top-8 md:left-10 text-primary/10">
          <Quote className="w-20 h-20 md:w-32 md:h-32 rotate-180 opacity-50" />
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-10 text-primary/10">
          <Quote className="w-20 h-20 md:w-32 md:h-32 opacity-50" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center w-full"
          >
            {/* Stars */}
            <div className="flex gap-1.5 mb-6 md:mb-8">
              {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                <Star key={j} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              ))}
            </div>

            {/* Cinematic Quote */}
            <p className="text-xl md:text-3xl lg:text-4xl font-serif italic text-foreground/90 leading-relaxed mb-8 md:mb-12 max-w-4xl px-4 md:px-12 text-balance">
              "{testimonials[current].text}"
            </p>

            {/* Author Profile */}
            <div className="flex items-center gap-4 bg-background/80 px-6 py-3 rounded-full border border-primary/20 shadow-lg">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-lg shadow-inner border border-primary/50">
                {testimonials[current].name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-base md:text-lg text-foreground">{testimonials[current].name}</div>
                <div className="text-xs md:text-sm text-primary font-medium tracking-wide">{testimonials[current].role}</div>
              </div>
              {/* Verified badge */}
              <div className="ml-2 pl-4 border-l border-primary/20">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary" title="Verified Customer">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Dots Navigation */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full relative overflow-hidden ${
              i === current ? "w-12 h-2.5 bg-primary/20" : "w-2.5 h-2.5 bg-primary/20 hover:bg-primary/40"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          >
            {i === current && (
              <motion.div 
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                key={current} // reset animation when current changes
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
