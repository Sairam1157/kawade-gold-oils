import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSlideItem {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  packagingTypes: Array<"Pouch" | "Bottle" | "Tin" | "Bulk">;
  hasPouchPackaging: boolean;
  bulkPricingAvailable: boolean;
}

const CARD_WIDTH = 300;
const GAP = 20;

const ProductSlider = ({ products }: { products: ProductSlideItem[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const controls = useAnimation();

  const total = products.length;

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    controls.start({ x: -(clamped * (CARD_WIDTH + GAP)), transition: { type: "spring", stiffness: 300, damping: 35 } });
  };

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStartX.current;
    controls.set({ x: -(current * (CARD_WIDTH + GAP)) + dragDelta.current });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragDelta.current < -60) goTo(current + 1);
    else if (dragDelta.current > 60) goTo(current - 1);
    else goTo(current);
  };

  return (
    <div className="relative w-full select-none">
      {/* Glow track fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-muted/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-muted/80 to-transparent" />

      {/* Scrollable track */}
      <div className="overflow-hidden px-4 sm:px-16 py-6">
        <motion.div
          ref={trackRef}
          animate={controls}
          className={`flex gap-5 cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
          style={{ width: "max-content" }}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerLeave={handleDragEnd}
          draggable={false}
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              animate={{ scale: i === current ? 1 : 0.92, opacity: i === current ? 1 : 0.7 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:border-primary/30 shadow-lg shadow-foreground/5 relative"
            >
              {/* Temple arch top frame */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-10" />

              {/* Product image */}
              <div className="relative bg-gradient-to-b from-primary/5 to-white/50 dark:to-card pt-6 pb-4 px-6 flex items-center justify-center" style={{ height: 220 }}>
                <motion.img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full w-auto object-contain drop-shadow-xl"
                  whileHover={{ scale: 1.08, rotate: -1 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Category pill */}
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground tracking-wider">
                  {p.category}
                </span>
                {/* Active indicator dot */}
                {i === current && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary" />
                )}
              </div>

              {/* Info */}
              <div className="px-5 pb-6 pt-3">
                <h3 className="font-display font-bold text-lg mb-1 truncate">{p.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>

                {/* Packaging tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.packagingTypes.map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                  ))}
                  {p.hasPouchPackaging && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Pouch</span>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <Link
                    to={`/contact?product=${p.id}`}
                    className="flex-1 text-center text-xs font-semibold py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    Enquire
                  </Link>
                  <a
                    href={`https://wa.me/917447297953?text=${encodeURIComponent(`Hi, I need bulk pricing for ${p.name}.`)}`}
                    target="_blank" rel="noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2.5 rounded-xl gold-gradient text-primary-foreground"
                  >
                    Bulk Quote
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Prev / Next arrow buttons */}
      <button
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-5 h-5 text-primary-foreground" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        disabled={current === total - 1}
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next product"
      >
        <ChevronRight className="w-5 h-5 text-primary-foreground" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to product ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
