import { Award, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
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

const Quality = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto">
      <div className="py-12">
        <SectionHeading
          label="Quality"
          title="Certifications & Quality Checks"
          description="We follow a repeatable QC process for safe, consistent edible oils — for retail and B2B." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ icon: ShieldCheck, title: "FSSAI Aligned", desc: "Food safety compliant processes" }, { icon: Award, title: "Batch Control", desc: "Batch coding and traceability" }, { icon: CheckCircle2, title: "Final Inspection", desc: "Pack & dispatch checks" }].map((c, i) => (
          <RevealSection key={c.title} delay={i * 80}>
            <div className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full">
              <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mb-4">
                <c.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="font-semibold text-lg mb-2">{c.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{c.desc}</div>
            </div>
          </RevealSection>
        ))}
      </div>

      <RevealSection className="mt-20">
        <div className="gold-gradient rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Need Documentation for Bulk Purchase?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            We can share relevant compliance details and batch information as needed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/bulk"
              className="inline-flex items-center gap-2 bg-primary-foreground px-8 py-3.5 rounded-full font-semibold text-primary transition-transform active:scale-[0.97]"
            >
              Bulk Supply <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20your%20quality%20documentation%20for%20bulk%20purchase."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20 active:scale-[0.97]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </RevealSection>
    </div>
  </div>
);

export default Quality;
