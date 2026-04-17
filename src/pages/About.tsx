import { Link } from "react-router-dom";
import { Heart, Leaf, Settings, Users, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { useAboutContent } from "@/context/AboutContentContext";
import factoryImg from "@/assets/about-factory.jpg";

const values = [
  { icon: Heart, title: "Purity First", desc: "Every batch is tested to ensure zero adulteration and maximum nutrition." },
  { icon: Leaf, title: "Sustainability", desc: "We source from responsible farms and minimize environmental impact." },
  { icon: Users, title: "Customer Trust", desc: "Over 10,000 happy customers trust us with their daily cooking needs." },
  { icon: Target, title: "Fair Pricing", desc: "Competitive wholesale & retail pricing without compromising on quality." },
];

// Milestones timeline removed per request

function RevealSection({ children, className = "", animation = "animate-reveal-up", delay = 0 }: {
  children: React.ReactNode; className?: string; animation?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? animation : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const About = () => {
  const { content } = useAboutContent();

  return (
    <div className="pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto">
      {/* Header */}
      <div className="py-12">
        <SectionHeading
          label={content.headerLabel}
          title={content.headerTitle}
          description={content.headerDescription}
        />
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <RevealSection animation="animate-reveal-left">
          <div className="relative">
            <img
              src={content.aboutImage || factoryImg}
              alt="Kawade Gold Oils processing facility"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 gold-gradient rounded-2xl p-6 shadow-lg">
              <div className="font-display text-3xl font-bold text-primary-foreground">{content.aboutYearsValue}</div>
              <div className="text-primary-foreground/80 text-sm">{content.aboutYearsLabel}</div>
            </div>
          </div>
        </RevealSection>
        <RevealSection animation="animate-reveal-right">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">{content.storyTitle}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {content.storyParagraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {content.storyParagraph2}
            </p>

            <h4 className="font-display text-xl font-semibold mt-6 mb-2">{content.visionHeading}</h4>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {content.visionParagraph}
            </p>

            <h4 className="font-display text-xl font-semibold mt-4 mb-2">{content.futureHeading}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {content.futureParagraph}
            </p>
          </div>
        </RevealSection>
      </div>

      {/* Values */}
      <RevealSection>
        <SectionHeading
          label="Our Values"
          title="What Drives Us"
        />
      </RevealSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {values.map((v, i) => (
          <RevealSection key={v.title} delay={i * 80}>
            <div className="bg-card rounded-2xl p-6 text-center shadow-md shadow-foreground/5 hover:shadow-lg transition-shadow duration-500">
              <div className="w-14 h-14 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-display font-semibold mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </RevealSection>
        ))}
      </div>

      {/* Milestones timeline removed */}

      <RevealSection className="mt-20">
        <div className="flex flex-col items-center gap-3 border-t border-border pt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-md">
            Staff: sign in to update daily oil prices and product cards shown across the site.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-muted/50"
          >
            <Settings className="w-4 h-4 text-primary" />
            Admin — prices &amp; oils
          </Link>
        </div>
      </RevealSection>
    </div>
    </div>
  );
};

export default About;
