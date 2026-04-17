import { Link } from "react-router-dom";
import { ChevronRight, Factory, Package, ShieldCheck, Truck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
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

const Manufacturing = () => {
  const { content } = useAboutContent();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto">
        <div className="py-12">
          <SectionHeading
            label="Manufacturing"
            title="In-House Refining & Packaging"
            description="We support pouch packaging, bottles, tins, and bulk supply with quality checks at every stage."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <div className="space-y-5">
              <h2 className="font-display text-3xl font-bold">Built for Quality & Scale</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our workflow covers sourcing, refining, filtration, automated filling, batch coding, and dispatch. This helps us
                supply consistent edible oils for retail packs and B2B requirements.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ icon: Factory, title: "Own Unit", desc: "Controlled process" }, { icon: ShieldCheck, title: "QC Checks", desc: "Batch monitoring" }, { icon: Package, title: "Packaging", desc: "Pouch / bottle / tin" }, { icon: Truck, title: "Bulk Supply", desc: "Tanker & drums" }].map((b) => (
                  <div key={b.title} className="bg-card rounded-2xl p-5 shadow-md shadow-foreground/5">
                    <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center mb-3">
                      <b.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="font-semibold">{b.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/bulk"
                  className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-full font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
                >
                  Bulk Supply <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/private-label"
                  className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-full font-semibold transition-all hover:bg-muted active:scale-[0.97]"
                >
                  Private Label <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={120}>
            <div className="bg-card rounded-3xl overflow-hidden shadow-md shadow-foreground/5">
              <img src={content.manufacturingImage || factoryImg} alt="Factory" className="w-full h-80 object-cover" />
              <div className="p-6 grid grid-cols-3 gap-4 text-center">
                {content.manufacturingStats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>

        <RevealSection className="mt-20">
          <div className="red-gradient rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">Need Pouch Packaging or Bulk Supply?</h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              Share your city, oil type, and monthly volume. We'll get back with pricing and timelines.
            </p>
            <a
              href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20manufacturing%20and%20packaging%20support.%20Please%20share%20options."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary-foreground px-8 py-3.5 rounded-full font-semibold text-secondary transition-transform active:scale-[0.97]"
            >
              WhatsApp Us <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </RevealSection>
      </div>
    </div>
  );
};

export default Manufacturing;
