import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Package, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TempleLayout from "@/components/TempleLayout";
import TempleDivider from "@/components/TempleDivider";
import { DivineLightRays } from "@/components/DivineElements";

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const features = [
  { icon: Sparkles, title: "Your Brand", desc: "Label-ready production — we manufacture, you brand it." },
  { icon: Package, title: "Packaging", desc: "Pouches, bottles, tins — all formats in your design." },
  { icon: Truck, title: "Supply", desc: "Dependable dispatch and bulk supply options across India." },
];

const steps = [
  { num: "01", title: "Choose Your Oil", desc: "Select from 7+ oil varieties we offer." },
  { num: "02", title: "Design Your Label", desc: "We print your brand name & design." },
  { num: "03", title: "Set Your MOQ", desc: "Flexible minimum order quantities." },
  { num: "04", title: "We Deliver", desc: "Ready-to-sell stock shipped to you." },
];

const PrivateLabel = () => (
  <TempleLayout watermark="kalash">
    <div className="pt-20 pb-12 relative overflow-hidden">
      {/* Divine decorations */}
      <div className="absolute left-3 md:left-8 top-40 bottom-40 w-5 temple-pillar opacity-30 pointer-events-none" />
      <div className="absolute right-3 md:right-8 top-40 bottom-40 w-5 temple-pillar opacity-30 pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 text-[140px] font-serif text-primary/[0.02] pointer-events-none select-none">&#9775;</div>
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="py-8 sm:py-12 relative">
          <DivineLightRays />
          <SectionHeading
            label="Private Label"
            title="Launch Your Own Oil Brand"
            description="We support branding, packaging, and supply for distributors and businesses — without you needing to set up a factory."
          />
          {/* Private label blessing */}
          <p className="text-center text-lg italic text-primary font-bold mt-4" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
            "स्वावलंबन और सफलता" — Self-reliance and Success
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <RevealSection key={f.title} delay={i * 80}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(234,179,8,0.12)" }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full border border-border/50 hover:border-primary/20 text-center"
              >
                <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <f.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="font-semibold text-lg mb-2">{f.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        <TempleDivider className="max-w-xs mx-auto my-14 opacity-60" />

        {/* How it works steps */}
        <RevealSection>
          <h3 className="font-display text-xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/20 shadow-md text-center relative"
              >
                <div className="font-display text-4xl font-extrabold text-primary/20 mb-3">{s.num}</div>
                <div className="font-semibold mb-1">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="mt-12">
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: "linear-gradient(135deg, hsl(0 65% 32%) 0%, hsl(0 60% 25%) 100%)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-primary/80 text-xs font-bold tracking-widest uppercase mb-3">अपना ब्रांड बनाएं · Build Your Brand</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Get MOQ & Pricing</h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Tell us your oil type, packaging preference, and expected monthly volume.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20private%20label%20edible%20oil.%20Please%20share%20MOQ%20and%20pricing."
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 rounded-full font-semibold text-primary-foreground active:scale-[0.97]"
                >
                  WhatsApp Us <ChevronRight className="w-4 h-4" />
                </a>
                <Link to="/manufacturing"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-3.5 rounded-full font-semibold text-white hover:bg-white/20 active:scale-[0.97]"
                >
                  Manufacturing <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-2 text-xs text-white/70 bg-white/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Pouch / Bottle / Tin options available
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  </TempleLayout>
);

export default PrivateLabel;
