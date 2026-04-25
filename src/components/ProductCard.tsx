import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  description: string;
  packagingTypes: Array<"Pouch" | "Bottle" | "Tin" | "Bulk">;
  hasPouchPackaging: boolean;
  bulkPricingAvailable: boolean;
  delay?: number;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  category,
  description,
  packagingTypes,
  hasPouchPackaging,
  bulkPricingAvailable,
  delay = 0,
}: ProductCardProps) => {
  
  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Dynamic Glare effect based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.5, 0, 0.5]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }} // Perspective context for 3D
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full bg-card rounded-3xl overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/20 border border-border/60 hover:border-primary/40 transition-shadow duration-500 flex flex-col"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-3xl"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
            opacity: glareOpacity,
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%"
          }}
        />

        <div className="relative overflow-hidden aspect-square flex-shrink-0" style={{ transform: "translateZ(30px)" }}>
          {/* Subtle background glow for product */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-6 relative z-10 drop-shadow-xl"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <span className="absolute top-5 left-5 z-10 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
            {category}
          </span>
        </div>

        <div className="p-6 pt-2 flex flex-col flex-1" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display font-bold text-xl mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed flex-1">{description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-5">
            {packagingTypes.filter(pack => pack !== "Bulk").map((pack) => (
              <span key={pack} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                {pack}
              </span>
            ))}
            {hasPouchPackaging && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Pouch
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <Link
              to={`/contact?product=${id}`}
              className="flex-1 text-center text-sm font-bold py-3 rounded-xl gold-gradient text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
