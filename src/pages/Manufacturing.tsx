import { Link } from "react-router-dom";
import { ChevronRight, Factory, Package, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TempleLayout from "@/components/TempleLayout";
import TempleDivider from "@/components/TempleDivider";
import { DivineLightRays } from "@/components/DivineElements";
import { useAboutContent } from "@/context/AboutContentContext";
import factoryImg from "@/assets/about-factory.jpg";

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const features = [
  { icon: Factory, title: "Own Unit", desc: "In-house controlled process for consistent quality every batch." },
  { icon: ShieldCheck, title: "QC Checks", desc: "Multi-point batch monitoring from raw material to dispatch." },
  { icon: Package, title: "Packaging", desc: "Pouch / Bottle / Tin formats for every market segment." },
  { icon: Truck, title: "Bulk Supply", desc: "Tanker & drum supply with on-time delivery guarantees." },
];

const Manufacturing = () => {
  const { content } = useAboutContent();

  return (
    <TempleLayout watermark="om">
      <div className="pt-20 pb-12 relative overflow-hidden">
        {/* Divine decorations */}
        <div className="absolute left-3 md:left-8 top-40 bottom-40 w-5 temple-pillar opacity-30 pointer-events-none" />
        <div className="absolute right-3 md:right-8 top-40 bottom-40 w-5 temple-pillar opacity-30 pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 text-[140px] font-serif text-primary/[0.02] pointer-events-none select-none">ॐ</div>
        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <div className="py-8 sm:py-12 relative">
            <DivineLightRays />
            <SectionHeading
              label="Manufacturing"
              title="In-House Refining & Packaging"
              description="We support pouch packaging, bottles, tins, and bulk supply with quality checks at every stage."
            />
            {/* Manufacturing blessing */}
            <p className="text-center text-lg italic text-primary font-bold mt-4" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              "शुद्ध उत्पादन, निरोगी जीवन" — Pure production, healthy life
            </p>
          </div>

          {/* Trust Badge Row */}
          <RevealSection>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {["FSSAI Certified", "100% Pure", "Batch Tested", "On-Time Delivery"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-semibold text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  {badge}
                </span>
              ))}
            </div>
          </RevealSection>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealSection>
              <div className="space-y-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold">Built for Quality & Scale</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our workflow covers sourcing, refining, filtration, automated filling, batch coding, and dispatch. This helps us
                  supply consistent edible oils for retail packs and B2B requirements.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((b, i) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-2xl p-5 shadow-md shadow-foreground/5 border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center mb-3">
                        <b.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="font-semibold mb-1">{b.title}</div>
                      <div className="text-xs text-muted-foreground">{b.desc}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link to="/bulk" className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-full font-semibold text-primary-foreground active:scale-[0.97]">
                    Bulk Supply <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link to="/private-label" className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-full font-semibold hover:bg-muted active:scale-[0.97]">
                    Private Label <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={120}>
              <div className="bg-card rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10">
                <img src={content.manufacturingImage || factoryImg} alt="Factory" className="w-full h-64 sm:h-80 object-cover" />
                <div className="p-6 grid grid-cols-3 gap-4 text-center border-t border-border/50">
                  {content.manufacturingStats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>

          <TempleDivider className="max-w-xs mx-auto my-16 opacity-60" />
          {/* Sacred lotus decoration */}
          <div className="flex justify-center gap-3 mb-8 opacity-25">
            <span className="text-primary text-2xl">&#10047;</span>
            <span className="text-primary text-xl">&#10047;</span>
            <span className="text-primary text-2xl">&#10047;</span>
          </div>

          {/* CTA */}
          <RevealSection className="mt-4">
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
              style={{ background: "linear-gradient(135deg, hsl(0 65% 32%) 0%, hsl(0 60% 25%) 100%)" }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <p className="text-primary/80 text-sm font-semibold tracking-widest uppercase mb-3">शुद्ध उत्पादन · Pure Manufacturing</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Need Pouch Packaging or Bulk Supply?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Share your city, oil type, and monthly volume. We'll get back with pricing and timelines.
                </p>
                <a
                  href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20manufacturing%20and%20packaging%20support.%20Please%20share%20options."
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 rounded-full font-semibold text-primary-foreground active:scale-[0.97]"
                >
                  WhatsApp Us <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </TempleLayout>
  );
};

export default Manufacturing;
