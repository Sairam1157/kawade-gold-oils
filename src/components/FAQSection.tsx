import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of edible oils do you offer?",
    a: "We offer six premium varieties: Soybean Oil, Palm Oil, Cooking Oil, Sunflower Oil, Mustard Oil, and Groundnut Oil. All our oils are 100% pure, FSSAI certified, and available in both retail and bulk quantities.",
  },
  {
    q: "Do you provide bulk or wholesale pricing?",
    a: "Yes! We specialize in wholesale supply. Whether you need 50 litres or 50 tons, we offer competitive bulk pricing with volume-based discounts. Contact us directly for a custom quote.",
  },
  {
    q: "What is your delivery area and timeline?",
    a: "We deliver across Maharashtra and major cities in India. Local orders within Maharashtra are typically delivered within 2-3 business days. Pan-India delivery takes 5-7 business days depending on location.",
  },
  {
    q: "Are your oils FSSAI certified?",
    a: "Absolutely. All Kawade Gold Oils products are FSSAI certified and undergo rigorous quality testing at every stage — from sourcing raw materials to the final packaging. Purity is our promise.",
  },
  {
    q: "How can I place a bulk order?",
    a: "You can place bulk orders through our Contact page, WhatsApp, or by calling us directly at +91 74472 97953. Our team will provide a customized quote based on your requirements and delivery schedule.",
  },
  {
    q: "What is your return and quality guarantee policy?",
    a: "We stand behind every product. If you receive a damaged or unsatisfactory product, contact us within 48 hours for a full replacement. Our quality guarantee covers purity, freshness, and proper packaging.",
  },
];

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

const FAQSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto">
      <RevealSection>
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Got questions? We've got answers. Here are the most common things our customers ask."
        />
      </RevealSection>
      <RevealSection className="max-w-3xl mx-auto" delay={100}>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card rounded-2xl shadow-md shadow-foreground/5 border-none px-6 overflow-hidden data-[state=open]:shadow-lg transition-shadow duration-500"
            >
              <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealSection>
    </div>
  </section>
);

export default FAQSection;
