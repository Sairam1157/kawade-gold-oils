import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Factory, Truck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TempleLayout from "@/components/TempleLayout";
import TempleDivider from "@/components/TempleDivider";
import { DivineLightRays } from "@/components/DivineElements";

function RevealSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const audiences = [
  { title: "Distributors", desc: "Wholesale supply for your distribution network and retail channels.", icon: Users },
  { title: "Restaurants & Caterers", desc: "Reliable recurring supply for commercial kitchens.", icon: Truck },
  { title: "Industry", desc: "Large-volume supply with documentation support and consistent batches.", icon: Factory },
];

const benefits = [
  "Bulk tanker and drum supply",
  "Recurring monthly supply commitments",
  "Competitive wholesale pricing",
  "Documentation support for purchase teams",
];

const Bulk = () => {
  const [form, setForm] = useState({ company: "", name: "", phone: "", city: "", monthlyVolume: "" });

  const onDistributorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Distributor Request:\n\nCompany: ${form.company}\nContact Person: ${form.name}\nPhone: ${form.phone}\nCity/Region: ${form.city}\nExpected Monthly Volume: ${form.monthlyVolume}`
    );
    window.open(`https://wa.me/917447297953?text=${message}`, "_blank");
    setForm({ company: "", name: "", phone: "", city: "", monthlyVolume: "" });
  };

  return (
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
              label="Bulk Supply"
              title="Wholesale Oil Supply"
              description="We supply edible oils in tanker-loads and drums for distributors, restaurants, and industries — with reliable delivery across India."
            />
            {/* Bulk blessing */}
            <p className="text-center text-lg italic text-primary font-bold mt-4" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              "समृद्धि और स्वास्थ्य" — Prosperity and Health
            </p>
          </div>

          {/* Audience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((a, i) => (
              <RevealSection key={a.title} delay={i * 80}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(234,179,8,0.12)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full border border-border/50 hover:border-primary/20"
                >
                  <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mb-4">
                    <a.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="font-semibold text-lg mb-2">{a.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{a.desc}</div>
                </motion.div>
              </RevealSection>
            ))}
          </div>

          <TempleDivider className="max-w-xs mx-auto my-14 opacity-60" />

          {/* Info panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevealSection>
              <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5 border border-border/50 h-full">
                <h3 className="font-display font-semibold text-2xl mb-2">Why Buy in Bulk?</h3>
                <p className="text-sm text-muted-foreground mb-5">Trusted by hundreds of businesses across Maharashtra and beyond.</p>
                <div className="space-y-3">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3 text-sm bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20bulk%20oil%20supply.%20Please%20share%20pricing%20and%20MOQ."
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 rounded-xl font-semibold text-white text-sm active:scale-[0.97]"
                  >
                    <Truck className="w-4 h-4" /> WhatsApp for Bulk Quote
                  </a>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-xl font-semibold text-sm hover:bg-muted active:scale-[0.97]">
                    Contact Form <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={120}>
              <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5 border border-border/50 h-full">
                <h3 className="font-display font-semibold text-2xl mb-2">What We Handle</h3>
                <p className="text-sm text-muted-foreground mb-5">From tanker supply to monthly contracts — all under one roof.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Monthly supply contracts", "Tanker supply", "Drums / barrels", "Distributor onboarding"].map((t) => (
                    <div key={t} className="bg-muted/40 rounded-xl p-4 border border-border/40 hover:border-primary/20 hover:bg-primary/5">
                      <div className="font-semibold text-sm">{t}</div>
                      <div className="text-xs text-muted-foreground mt-1">Share your city, volume, and oil type.</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/manufacturing" className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-xl font-semibold text-primary-foreground text-sm active:scale-[0.97]">
                    Manufacturing <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-xl font-semibold text-sm hover:bg-muted active:scale-[0.97]">
                    Contact us <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Distributor Form */}
          <RevealSection className="mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5 border border-primary/10">
              <div className="text-center mb-6">
                <p className="text-xs font-bold tracking-widest text-primary/70 uppercase mb-2">अन्नदाता सुखी भव · Provider of Pure Food</p>
                <h3 className="font-display font-semibold text-2xl">Become a Distributor</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
                  Share your business details to get wholesale pricing slabs, monthly supply plans, and distributor onboarding support.
                </p>
              </div>
              <form onSubmit={onDistributorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contact person" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City / region" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required value={form.monthlyVolume} onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })} placeholder="Expected monthly volume (tons/liters)" className="md:col-span-2 px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button type="submit" className="md:col-span-2 inline-flex justify-center items-center gap-2 gold-gradient px-6 py-3.5 rounded-xl font-semibold text-primary-foreground active:scale-[0.97]">
                  Submit Distributor Request
                </button>
              </form>
            </div>
          </RevealSection>

          {/* CTA */}
          <RevealSection className="mt-12">
            <div className="relative overflow-hidden gold-gradient rounded-3xl p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">Get a Wholesale Quote Today</h2>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                  Share your location, monthly volume, oil type, and packaging preference.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://wa.me/917447297953?text=Hi%2C%20I%27d%20like%20a%20wholesale%20quote." target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-foreground px-8 py-3.5 rounded-full font-semibold text-primary active:scale-[0.97]">
                    WhatsApp Quote <ChevronRight className="w-4 h-4" />
                  </a>
                  <Link to="/products" className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-primary-foreground hover:bg-primary-foreground/20 active:scale-[0.97]">
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </TempleLayout>
  );
};

export default Bulk;
