import { Award, CheckCircle2, ChevronRight, ShieldCheck, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
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

const certifications = [
  { icon: ShieldCheck, title: "FSSAI Aligned", desc: "Food safety compliant processes at every stage of production." },
  { icon: Award, title: "Batch Control", desc: "Full batch coding and traceability from source to shelf." },
  { icon: CheckCircle2, title: "Final Inspection", desc: "Rigorous pack & dispatch checks before every shipment." },
  { icon: Leaf, title: "100% Pure", desc: "No adulterants, no shortcuts — only pure, natural oil." },
];

const Quality = () => (
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
            label="Quality"
            title="Certifications & Quality Checks"
            description="We follow a repeatable QC process for safe, consistent edible oils — for retail and B2B."
          />
          {/* Quality blessing */}
          <p className="text-center text-lg italic text-primary font-bold mt-4" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
            "शुद्धता ही सेवा है" — Purity is Service
          </p>
        </div>

        {/* Sanskrit purity quote */}
        <RevealSection>
          <div className="text-center mb-10 relative">
            {/* Decorative lotus */}
            <div className="flex justify-center gap-2 mb-4 opacity-30">
              <span className="text-primary text-lg">&#10047;</span>
              <span className="text-primary text-xl">&#10047;</span>
              <span className="text-primary text-lg">&#10047;</span>
            </div>
            <p className="font-serif text-primary text-xl md:text-2xl italic font-semibold" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              "शुद्धम अन्नम, आयुर्वरधनम"
            </p>
            <p className="text-sm tracking-widest uppercase text-primary/70 mt-2 font-medium">Pure food promotes long life</p>
          </div>
        </RevealSection>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((c, i) => (
            <RevealSection key={c.title} delay={i * 80}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(234,179,8,0.12)" }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full border border-border/50 hover:border-primary/20 text-center"
              >
                <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <c.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="font-semibold text-lg mb-2">{c.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{c.desc}</div>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        <TempleDivider className="max-w-xs mx-auto my-14 opacity-60" />

        {/* Process steps */}
        <RevealSection>
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-md">
            <h3 className="font-display text-xl font-bold text-center mb-8">Our Quality Process</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Source Verification", "Refining & Filtration", "Batch Testing", "Certified Dispatch"].map((step, i) => (
                <div key={step} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                  <p className="text-xs font-semibold text-foreground/80">{step}</p>
                  {i < 3 && <div className="hidden md:block absolute translate-x-full w-8 h-px bg-primary/30" />}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="mt-12">
          <div className="relative overflow-hidden gold-gradient rounded-3xl p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">Need Documentation for Bulk Purchase?</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                We can share relevant compliance details and batch information as needed.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/bulk" className="inline-flex items-center gap-2 bg-primary-foreground px-8 py-3.5 rounded-full font-semibold text-primary active:scale-[0.97]">
                  Bulk Supply <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20your%20quality%20documentation%20for%20bulk%20purchase."
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-primary-foreground hover:bg-primary-foreground/20 active:scale-[0.97]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  </TempleLayout>
);

export default Quality;
