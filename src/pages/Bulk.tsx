import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Factory, Truck, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

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
    const whatsappUrl = `https://wa.me/917447297953?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setForm({ company: "", name: "", phone: "", city: "", monthlyVolume: "" });
  };

  return (
  <div className="pt-24 pb-16">
    <div className="container mx-auto">
      <div className="py-12">
        <SectionHeading
          label="Bulk Supply"
          title="Wholesale & Tanker Supply"
          description="Bulk quantities for distributors, restaurants, and industries — with dependable delivery and consistent quality."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audiences.map((a, i) => (
          <RevealSection key={a.title} delay={i * 80}>
            <div className="bg-card rounded-2xl p-7 shadow-md shadow-foreground/5 h-full">
              <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mb-4">
                <a.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="font-semibold text-lg mb-2">{a.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{a.desc}</div>
            </div>
          </RevealSection>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <RevealSection>
          <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5">
            <h3 className="font-display font-semibold text-2xl mb-4">Why Buy in Bulk?</h3>
            <div className="space-y-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20bulk%20oil%20supply.%20Please%20share%20pricing%20and%20MOQ."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 rounded-xl font-semibold text-card text-sm transition-transform active:scale-[0.97]"
              >
                <Truck className="w-4 h-4" /> WhatsApp for Bulk Quote
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-muted active:scale-[0.97]"
              >
                Contact Form <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5">
            <h3 className="font-display font-semibold text-2xl mb-4">Typical Requirements We Handle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Monthly supply contracts", "Tanker supply", "Drums / barrels", "Distributor onboarding"].map((t) => (
                <div key={t} className="bg-muted/40 rounded-xl p-4">
                  <div className="font-semibold text-sm">{t}</div>
                  <div className="text-xs text-muted-foreground mt-1">Share your city, volume, and oil type to get a quote.</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="text-sm text-muted-foreground">
                Want manufacturing + packaging too?
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  to="/manufacturing"
                  className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-xl font-semibold text-primary-foreground text-sm transition-transform active:scale-[0.97]"
                >
                  Manufacturing <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-muted active:scale-[0.97]"
                >
                  Contact us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      <RevealSection className="mt-16">
        <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5">
          <h3 className="font-display font-semibold text-2xl mb-2">Become a Distributor</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Share your business details to get wholesale pricing slabs, monthly supply plans, and distributor onboarding support.
          </p>
          <form onSubmit={onDistributorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contact person" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City / region" className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input required value={form.monthlyVolume} onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })} placeholder="Expected monthly volume (tons/liters)" className="md:col-span-2 px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="md:col-span-2 inline-flex justify-center items-center gap-2 gold-gradient px-6 py-3 rounded-xl font-semibold text-primary-foreground transition-transform active:scale-[0.97]">
              Submit Distributor Request
            </button>
          </form>
        </div>
      </RevealSection>

      <RevealSection className="mt-20">
        <div className="gold-gradient rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Get a Wholesale Quote Today</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Share your location, monthly volume, oil type, and packaging preference. We’ll respond with pricing and timelines.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/917447297953?text=Hi%2C%20I%27d%20like%20a%20wholesale%20quote.%20City%3A%20%5Byour%20city%5D%2C%20Oil%3A%20%5Boil%5D%2C%20Volume%3A%20%5Bmonthly%20volume%5D"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground px-8 py-3.5 rounded-full font-semibold text-primary transition-transform active:scale-[0.97]"
            >
              WhatsApp Quote <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20 active:scale-[0.97]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  </div>
  );
};

export default Bulk;
