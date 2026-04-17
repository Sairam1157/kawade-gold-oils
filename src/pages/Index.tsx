import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Shield, Truck, Award, Star, ChevronRight, Droplets, Factory, Package2, Handshake } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import FloatingElements from "@/components/FloatingElements";
import FAQSection from "@/components/FAQSection";
import { useProductCatalog } from "@/context/ProductCatalogContext";
import { useHomeContent } from "@/context/HomeContentContext";
import heroImg from "@/assets/hero-oil.jpg";

const highlights = [
  { icon: Factory, title: "Industry-Sourced Oils", desc: "We procure oils from large, trusted refineries and supply at wholesale scale." },
  { icon: Package2, title: "Pouch Packaging Available", desc: "Stand-up, pillow, and spout pouch options for modern retail." },
  { icon: Handshake, title: "Trusted Partnerships", desc: "Long-term supply relationships with distributors, retailers, and commercial kitchens across India." },
  { icon: Truck, title: "Bulk Delivery", desc: "Wholesale supply with reliable on-time delivery across India." },
  { icon: Award, title: "FSSAI Certified", desc: "All products meet India's highest food safety standards." },
  { icon: Shield, title: "100% Pure", desc: "No additives, no chemicals — pure quality you can trust." },
];


function RevealSection({ children, className = "", animation = "animate-reveal-up", delay = 0 }: {
  children: React.ReactNode; className?: string; animation?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const { products } = useProductCatalog();
  const { content: { stats, testimonials } } = useHomeContent();

  return (
  <div className="overflow-hidden">
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Kawade Gold Oils premium edible oil products" className="w-full h-full object-cover scale-110" style={{ transform: `scale(1.1)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>
      <div className="container mx-auto relative z-10 py-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-reveal-up">
            <Droplets className="w-4 h-4" /> Trusted 
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.1] mb-6 animate-reveal-up" style={{ animationDelay: "100ms" }}>
            Pure Quality,{" "}
            <span className="gold-text-gradient">Golden</span> Taste
          </h1>
          <p className="text-background/80 text-lg mb-8 max-w-md animate-reveal-up" style={{ animationDelay: "200ms" }}>
            Premium edible oils for homes and businesses. Wholesale & retail supply of soybean, palm, and cooking oils.
          </p>
          <div className="flex flex-wrap gap-4 animate-reveal-up" style={{ animationDelay: "300ms" }}>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 gold-gradient px-7 py-3.5 rounded-full font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-lg shadow-primary/30"
            >
              Explore Products <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 px-7 py-3.5 rounded-full font-semibold text-background transition-all hover:bg-background/20 active:scale-[0.97]"
            >
              Contact Us <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-7 py-3.5 rounded-full font-semibold text-card transition-transform active:scale-[0.97]"
            >
              Get Bulk Quote on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="relative -mt-16 z-10">
      <div className="container mx-auto">
        <div className="bg-card rounded-2xl shadow-xl shadow-foreground/5 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="py-24 relative">
      <FloatingElements />
      <div className="container mx-auto">
        <RevealSection>
          <SectionHeading
            label="Why Choose Us"
            title="Quality You Can Trust"
            description="For over 25 years, Kawade Gold Oils has been delivering pure, certified edible oils to thousands of families and businesses."
          />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <RevealSection key={h.title} delay={i * 100}>
              <div className="bg-card rounded-2xl p-8 text-center shadow-md shadow-foreground/5 hover:shadow-lg transition-shadow duration-500">
                <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <h.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{h.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
        <RevealSection className="mt-10">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <a href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply" target="_blank" rel="noreferrer" className="bg-muted hover:bg-muted/80 rounded-xl p-4 text-sm font-medium transition-colors">
                I want bulk oil supply
              </a>
              <a href="https://wa.me/917447297953?text=I%20need%20pouch%20packaging" target="_blank" rel="noreferrer" className="bg-muted hover:bg-muted/80 rounded-xl p-4 text-sm font-medium transition-colors">
                I need pouch packaging
              </a>
              <a href="https://wa.me/917447297953?text=I%27d%20like%20today%27s%20oil%20prices" target="_blank" rel="noreferrer" className="bg-muted hover:bg-muted/80 rounded-xl p-4 text-sm font-medium transition-colors">
                Ask for today&apos;s oil prices
              </a>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>

    {/* Products */}
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto">
        <RevealSection>
          <SectionHeading
            label="Our Products"
            title="Premium Edible Oils"
            description="From light soybean oil for everyday cooking to bulk palm oil for commercial kitchens — we have it all."
          />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p, i) => (
            <RevealSection key={p.id} animation="animate-reveal-scale" delay={i * 100}>
              <ProductCard {...p} />
            </RevealSection>
          ))}
        </div>
        <RevealSection className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 gold-gradient px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
          >
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </RevealSection>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24">
      <div className="container mx-auto">
        <RevealSection>
          <SectionHeading
            label="Testimonials"
            title="What Our Customers Say"
            description="Trusted by homemakers, restaurants, and wholesale distributors across India."
          />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i * 100}>
              <div className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <FAQSection />

    {/* CTA */}
    <section className="py-24">
      <div className="container mx-auto">
        <RevealSection>
          <div className="gold-gradient rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
                Ready to Order Premium Oils?
              </h2>
              <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
                Get competitive wholesale pricing. Contact us for a custom quote tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-foreground px-8 py-3.5 rounded-full font-semibold text-background transition-transform active:scale-[0.97]"
                >
                  Request a Quote
                </Link>
                <a
                  href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20 active:scale-[0.97]"
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
