import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Shield, Truck, Award, Star, ChevronRight, Factory, Package2, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ProductSlider from "@/components/ProductSlider";
import FloatingElements from "@/components/FloatingElements";
import FAQSection from "@/components/FAQSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import TempleDivider, { CornerOrnament } from "@/components/TempleDivider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { useProductCatalog } from "@/context/ProductCatalogContext";
import { useHomeContent } from "@/context/HomeContentContext";
import logo from "@/assets/logo.png";
import ToranArch from "@/components/ToranArch";

const highlights = [
  { icon: Factory, title: "Industry-Sourced Oils", desc: "We procure oils from large, trusted refineries and supply at wholesale scale." },
  { icon: Package2, title: "Pouch Packaging Available", desc: "Stand-up, pillow, and spout pouch options for modern retail." },
  { icon: Handshake, title: "Trusted Partnerships", desc: "Long-term supply relationships with distributors, retailers, and commercial kitchens across India." },
  { icon: Truck, title: "Bulk Delivery", desc: "Wholesale supply with reliable on-time delivery across India." },
  { icon: Award, title: "FSSAI Certified", desc: "All products meet India's highest food safety standards." },
  { icon: Shield, title: "100% Pure", desc: "No additives, no chemicals — pure quality you can trust." },
];

function RevealSection({ children, className = "", animation = "up", delay = 0 }: {
  children: React.ReactNode; className?: string; animation?: "up" | "scale"; delay?: number;
}) {
  const variants = {
    hidden: animation === "scale" ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 30 },
    visible: animation === "scale" ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Index = () => {
  const { products } = useProductCatalog();
  const { content: { stats, testimonials } } = useHomeContent();

  return (
    <div className="overflow-hidden relative">
      {/* Hero Slideshow */}
      <HeroSlideshow />



      {/* Stats — CSS-only GPU-accelerated ticker (no JS animation) */}
      <section className="relative z-10 overflow-hidden border-y border-primary/20 bg-card shadow-lg shadow-primary/8">
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-card to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-card to-transparent" />
        <div className="stats-ticker flex items-center gap-0 py-3" style={{ width: "max-content" }}>
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/8 to-primary/4 hover:border-primary/60 mx-3 shrink-0 relative">
                <div className="absolute inset-1.5 rounded-full border border-primary/15" />
                <div className="font-display text-sm font-bold gold-text-gradient tabular-nums relative z-10 leading-none">{s.value}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5 font-medium text-center px-1 leading-tight relative z-10">{s.label}</div>
              </div>
              <div className="flex flex-col items-center gap-0.5 mx-1 opacity-40 shrink-0">
                <div className="w-px h-3 bg-primary/50" />
                <div className="w-1 h-1 rounded-full bg-primary/60" />
                <div className="w-px h-3 bg-primary/50" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SLOGAN BANNER */}
      <section className="py-10 md:py-14 relative overflow-hidden bg-gradient-to-b from-primary/8 via-muted/10 to-transparent">
        <ToranArch />
        {/* Temple pillar decorations */}
        <div className="absolute left-4 md:left-12 top-0 bottom-0 w-6 temple-pillar opacity-50 pointer-events-none" />
        <div className="absolute right-4 md:right-12 top-0 bottom-0 w-6 temple-pillar opacity-50 pointer-events-none" />
        {/* Sacred Om watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-serif text-primary/[0.03] pointer-events-none select-none">ॐ</div>
        {/* Deep Spiritual Inner Sanctum Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.12),transparent_65%)] pointer-events-none" />


        {/* Pillar styling left/right (CSS only borders for elegance) */}
        <div className="absolute left-4 md:left-12 top-0 bottom-0 w-8 border-x-2 border-primary/10 opacity-30 pointer-events-none flex justify-center">
          <div className="w-[1px] h-full bg-primary/20" />
        </div>
        <div className="absolute right-4 md:right-12 top-0 bottom-0 w-8 border-x-2 border-primary/10 opacity-30 pointer-events-none flex justify-center">
          <div className="w-[1px] h-full bg-primary/20" />
        </div>

        <div className="container mx-auto text-center relative z-10 py-2">

          {/* Logo + Tagline — compact row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-1 mb-3"
          >
            <motion.img
              src={logo}
              alt="Kawade Gold Oils"
              className="h-14 md:h-16 w-auto object-contain drop-shadow-md"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase drop-shadow-sm">
              Good Oil · Good Health · Good Life
            </p>
          </motion.div>

          {/* Sanskrit Shloka — visible */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl italic text-primary font-bold mb-3 drop-shadow-sm"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            "शुद्धम् अन्नम्, आयुर्वर्धनम्"
          </motion.p>

          <TempleDivider className="max-w-xs mx-auto mb-4" />

          {/* Main headline — divine gradient with better visibility */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-tight drop-shadow-sm"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
                background: "linear-gradient(135deg, hsl(42 90% 55%) 0%, hsl(35 95% 50%) 30%, hsl(30 90% 45%) 60%, hsl(25 85% 40%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation: "shimmer 4s linear infinite",
              }}
            >
              GOOD OIL.{" "}
              <span style={{ WebkitTextFillColor: "hsl(0 75% 35%)", backgroundImage: "none", fontWeight: 900 }}>
                PURE HEALTH.
              </span>
            </motion.h2>
          </div>
          {/* Divine blessing line — more visible */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base tracking-[0.25em] text-primary mt-3 uppercase font-bold drop-shadow-sm"
          >
            Swasth Ann, Swasth Jeevan
          </motion.p>

          <TempleDivider className="max-w-xs mx-auto mt-4" />
        </div>
      </section>


      {/* Highlights — Why Choose Us */}
      <section className="py-16 relative overflow-hidden">
        <FloatingElements />

        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(30 95% 52%) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-4">
          <RevealSection>
            <CornerOrnament />
            <SectionHeading
              label="Why Choose Us"
              title="Quality You Can Trust"
              description="For over 25 years, Kawade Gold Oils has been delivering pure, certified edible oils to thousands of families and businesses."
            />
            <TempleDivider className="max-w-md mx-auto mt-4" />
          </RevealSection>

          {/* Feature cards — numbered, with glowing icon aura */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {highlights.map((h, i) => (
              <RevealSection key={h.title} delay={i * 100}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-card rounded-3xl p-7 border border-border/60 hover:border-primary/40 shadow-md hover:shadow-xl hover:shadow-primary/10 overflow-hidden cursor-default will-animate"
                >
                  {/* Animated gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Number watermark */}
                  <span className="absolute -top-3 -right-1 font-display font-extrabold text-7xl text-primary/5 group-hover:text-primary/10 select-none leading-none transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top gold bar on hover */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  {/* Icon with hover effect */}
                  <div className="relative w-16 h-16 mb-5 group/icon">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10" />
                    <div className="relative w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover/icon:scale-110 transition-transform duration-300">
                      <h.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>

                  {/* Bottom corner accents */}
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-primary/30 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 delay-75" />
                </motion.div>
              </RevealSection>
            ))}
          </div>

          {/* Trust bar */}
          <RevealSection className="mt-12">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-primary/5 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.08),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <p className="text-center text-xs font-bold tracking-widest text-primary/60 uppercase mb-5">Connect with us instantly</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Bulk Oil Supply", msg: "I%20want%20bulk%20oil%20supply", icon: "🛢️" },
                    { label: "Pouch Packaging", msg: "I%20need%20pouch%20packaging", icon: "📦" },
                    { label: "Today's Oil Prices", msg: "I%27d%20like%20today%27s%20oil%20prices", icon: "💰" },
                  ].map(({ label, msg, icon }) => (
                    <a key={msg}
                      href={`https://wa.me/917447297953?text=${msg}`}
                      target="_blank" rel="noreferrer"
                      className="group flex items-center gap-3 bg-background/60 hover:bg-[#25D366]/10 border border-border hover:border-[#25D366]/40 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
                      <span className="flex-1">{label}</span>
                      <svg className="w-4 h-4 text-[#25D366] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.546 4.09 1.502 5.814L0 24l6.335-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.367l-.36-.213-3.726.872.934-3.63-.234-.374A9.818 9.818 0 1112 21.818z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Temple divider */}
      <div className="container mx-auto px-4">
        <TempleDivider />
      </div>

      {/* Products */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-muted/60 relative overflow-hidden">
        {/* Subtle mandala watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025]">
          <div className="w-[600px] h-[600px] rounded-full border-8 border-primary" />
          <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-primary" />
          <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-primary" />
        </div>
        {/* Divine corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <RevealSection>
            <CornerOrnament />
            <SectionHeading
              label="Our Products"
              title="Premium Edible Oils"
              description="From light soybean oil for everyday cooking to bulk palm oil for commercial kitchens — swipe to explore."
            />
            <TempleDivider className="max-w-md mx-auto mt-4" />
          </RevealSection>

          {/* ✦ Unique Draggable Product Slider ✦ */}
          <div className="mt-10 -mx-4 sm:-mx-0">
            <ProductSlider products={products} />
          </div>
          <RevealSection className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 gold-gradient px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-transform active:scale-[0.97] diya-glow hover:scale-105"
            >
              View All Products <ChevronRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Temple divider */}
      <div className="container mx-auto px-4">
        <TempleDivider />
      </div>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        {/* Deep temple background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 0%, hsl(38 45% 93%) 30%, hsl(38 40% 90%) 70%, transparent 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.08),transparent_70%)] pointer-events-none" />
        {/* Lotus petal decorations */}
        <div className="absolute top-12 left-1/4 text-primary/10 text-4xl pointer-events-none">&#10047;</div>
        <div className="absolute top-20 right-1/4 text-primary/10 text-3xl pointer-events-none">&#10047;</div>
        <div className="absolute bottom-16 left-1/3 text-primary/10 text-3xl pointer-events-none">&#10047;</div>
        <div className="absolute bottom-24 right-1/3 text-primary/10 text-4xl pointer-events-none">&#10047;</div>

        <div className="container mx-auto px-4 relative z-10">
          <RevealSection>
            <CornerOrnament />
            <SectionHeading
              label="Testimonials"
              title="What Our Customers Say"
              description="Trusted by homemakers, restaurants, and wholesale distributors across India."
            />
            <TempleDivider className="max-w-md mx-auto mt-4" />
          </RevealSection>

          {/* Cinematic Carousel */}
          <TestimonialCarousel testimonials={testimonials} />

          {/* Trust ribbon below testimonials */}
          <RevealSection className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-6 py-5 border-y border-primary/15 max-w-5xl mx-auto">
              {[
                { num: "10K+", label: "Happy Customers" },
                { num: "25+", label: "Years of Trust" },
                { num: "5★", label: "Average Rating" },
                { num: "500+", label: "Monthly Tons" },
              ].map((s) => (
                <div key={s.label} className="text-center px-6">
                  <div className="font-display text-2xl font-extrabold text-primary leading-none">{s.num}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>


      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden border-2 border-primary/40 shadow-2xl shadow-primary/20"
                 style={{ background: "linear-gradient(135deg, hsl(38 50% 94%) 0%, hsl(38 45% 88%) 50%, hsl(38 40% 85%) 100%)" }}>
              {/* Stronger mandala ring decorations */}
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-4 border-primary/30 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-2 border-primary/25 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-4 border-primary/30 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border-2 border-primary/25 pointer-events-none" />
              
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.25),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.15),transparent_50%)]" />
              
              {/* Corner lotus decorations */}
              <div className="absolute top-8 left-8 text-primary/20 text-3xl pointer-events-none">&#10047;</div>
              <div className="absolute top-8 right-8 text-primary/20 text-3xl pointer-events-none">&#10047;</div>
              <div className="absolute bottom-8 left-8 text-primary/20 text-3xl pointer-events-none">&#10047;</div>
              <div className="absolute bottom-8 right-8 text-primary/20 text-3xl pointer-events-none">&#10047;</div>
              
              <div className="relative z-10">
                {/* Decorative element */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                </div>

                <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6 text-balance drop-shadow-sm">
                  Ready to Order Premium Oils?
                </h2>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
                  <span className="text-primary/50 text-2xl">&#10047;</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
                </div>
                
                <p className="text-foreground/90 max-w-lg mx-auto mb-10 text-lg leading-relaxed font-medium">
                  Get competitive wholesale pricing. Contact us for a custom quote tailored to your needs.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 gold-gradient px-10 py-4 rounded-full font-bold text-primary-foreground transition-all active:scale-[0.97] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] px-10 py-4 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-[0.97] shadow-lg shadow-green-500/30 hover:shadow-xl"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
