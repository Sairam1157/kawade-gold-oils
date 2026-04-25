import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import slide1 from "@/assets/final-slide-1.jpg";
import slide2 from "@/assets/final-slide-2.jpg";
import slide3 from "@/assets/final-slide-4.jpg";
import slide4 from "@/assets/hd-slide-3.jpg";



const slides = [
  {
    id: 1,
    image: slide1,
    primaryAction: { text: "Explore Products", link: "/products" },
  },
  {
    id: 2,
    image: slide2,
    primaryAction: { text: "View All Products", link: "/products" },
  },
  {
    id: 3,
    image: slide3,
    primaryAction: { text: "View All Products", link: "/products" },
  },
  {
    id: 4,
    image: slide4,
    primaryAction: { text: "View All Products", link: "/products" },
  },
 
  
];

const INTERVAL = 6000;

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentSlide(index);
  };

  const next = () => goTo((currentSlide + 1) % slides.length, 1);
  const prev = () => goTo((currentSlide - 1 + slides.length) % slides.length, -1);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ paddingTop: "64px" }}>
      {/* Slideshow container */}
      <div className="relative w-full overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <motion.img
              src={slides[currentSlide].image}
              alt={`Kawade Gold Oils Banner ${currentSlide + 1}`}
              className="w-full h-auto block"
              style={{ objectFit: "cover", objectPosition: "center", minHeight: "220px" }}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left / Right Arrow Controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Gradient overlay at bottom for button readability */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* Overlaid CTA + Indicators */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 pb-5 sm:pb-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Link
                to={slides[currentSlide].primaryAction.link}
                className="inline-flex items-center gap-2 gold-gradient px-7 py-3 sm:px-9 sm:py-3.5 rounded-full font-bold text-primary-foreground text-sm sm:text-base shadow-lg shadow-black/40 hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-[0.97]"
              >
                {slides[currentSlide].primaryAction.text} <ChevronRight className="w-4 h-4" />
              </Link>
              {currentSlide === 0 && (
                <a
                  href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] px-7 py-3 sm:px-9 sm:py-3.5 rounded-full font-bold text-white text-sm sm:text-base shadow-lg shadow-black/40 hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-[0.97]"
                >
                  WhatsApp Us
                </a>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide dot indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index, index > currentSlide ? 1 : -1)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-8 h-2 bg-primary shadow-[0_0_8px_rgba(234,179,8,0.7)]"
                    : "w-2 h-2 bg-white/50 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;
