import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";
import { useAboutContent } from "@/context/AboutContentContext";

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

const Contact = () => {
  const { content } = useAboutContent();
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");
  const factoryVisitParam = searchParams.get("factoryVisit");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: factoryVisitParam ? "Request Factory Visit" : (productParam ? `Enquiry about ${productParam}` : ""),
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Contact Form:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`
    );
    const whatsappUrl = `https://wa.me/918087503515?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto">
        <div className="py-12">
          <SectionHeading
            label="Get in Touch"
            title="Contact Us"
            description="Have a question or want a quote? We'd love to hear from you."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <RevealSection>
              <div className="bg-card rounded-2xl p-6 shadow-md shadow-foreground/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href={`tel:${content.phoneNumber1.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block">{content.phoneNumber1}</a>
                    <a href={`tel:${content.phoneNumber2.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block">{content.phoneNumber2}</a>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={80}>
              <div className="bg-card rounded-2xl p-6 shadow-md shadow-foreground/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:info@kawadegoldoils.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">info@kawadegoldoils.com</a>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={160}>
              <div className="bg-card rounded-2xl p-6 shadow-md shadow-foreground/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-sm text-muted-foreground">Shivoor Bangla,<br />Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={240}>
              <div className="space-y-3">
                <a
                  href="https://wa.me/917447297953?text=I%20want%20bulk%20oil%20supply"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] w-full py-3.5 rounded-xl font-semibold text-card text-sm transition-transform active:scale-[0.97]"
                >
                  <MessageCircle className="w-5 h-5" /> I want bulk oil supply
                </a>
                <a
                  href="https://wa.me/917447297953?text=I%20need%20pouch%20packaging"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] w-full py-3.5 rounded-xl font-semibold text-card text-sm transition-transform active:scale-[0.97]"
                >
                  <MessageCircle className="w-5 h-5" /> I need pouch packaging
                </a>
                <a
                  href="https://wa.me/917447297953?text=I%20would%20like%20to%20request%20a%20factory%20visit"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-card border border-border w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-muted"
                >
                  Request Factory Visit
                </a>
              </div>
            </RevealSection>
          </div>

          {/* Form */}
          <RevealSection className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-md shadow-foreground/5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subject *</label>
                  <input
                    required
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="e.g. Bulk order enquiry"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  placeholder="Tell us what you need..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 gold-gradient px-8 py-3.5 rounded-full font-semibold text-primary-foreground transition-transform active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
              >
                {sending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </RevealSection>
        </div>

        {/* Map */}
        <RevealSection className="mt-16">
          <div className="rounded-2xl overflow-hidden shadow-md h-80">
            <iframe
              title="Kawade Gold Oils Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.7889054125583!2d74.91297326960905!3d20.08578049883362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc0b9ceb96389b%3A0xac23953cb29616c9!2sKawade%20Gold%20Oils%20%E2%80%93%20Edible%20Oil%20Wholesaler!5e0!3m2!1sen!2sin!4v1776447155650!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealSection>
      </div>
    </div>
  );
};

export default Contact;
