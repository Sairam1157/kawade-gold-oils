import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Package, Sparkles, Truck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const PrivateLabel = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto">
      <div className="py-12">
        <SectionHeading
          label="Private Label"
          title="Launch Your Own Oil Brand"
          description="We support branding, packaging, and supply for distributors and businesses — without you needing to set up a factory." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ icon: Sparkles, title: "Your Brand", desc: "Label-ready production" }, { icon: Package, title: "Packaging", desc: "Pouches, bottles, tins" }, { icon: Truck, title: "Supply", desc: "Dispatch and bulk options" }].map((f, i) => (
          <RevealSection key={f.title} delay={i * 80}>
            <div className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full">
              <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="font-semibold text-lg mb-2">{f.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
            </div>
          </RevealSection>
        ))}
      </div>

      <RevealSection className="mt-20">
        <div className="red-gradient rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">Get MOQ & Pricing</h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Tell us your oil type, packaging preference, and expected monthly volume.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20private%20label%20edible%20oil.%20Please%20share%20MOQ%20and%20pricing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary-foreground px-8 py-3.5 rounded-full font-semibold text-secondary transition-transform active:scale-[0.97]"
            >
              WhatsApp Us <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              to="/manufacturing"
              className="inline-flex items-center gap-2 bg-secondary-foreground/10 backdrop-blur-sm border border-secondary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-secondary-foreground transition-all hover:bg-secondary-foreground/20 active:scale-[0.97]"
            >
              Manufacturing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="text-xs text-secondary-foreground/80 max-w-xl">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Pouch / Bottle / Tin options available
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  </div>
);

export default PrivateLabel;
