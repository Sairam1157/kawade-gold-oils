import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useAboutContent } from "@/context/AboutContentContext";
import { ColorfulInstagram } from "@/components/ColorfulInstagram";
import TempleDivider from "@/components/TempleDivider";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { content } = useAboutContent();

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(20 25% 10%), hsl(20 30% 7%))" }}>

      {/* Temple decorative top border */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(30 95% 52%), hsl(42 92% 68%), hsl(30 95% 52%), transparent)" }} />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Kawade Gold Oils Logo" className="h-20 md:h-24 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-amber-100/60">
              Trusted edible oil wholesaler and distributor in Maharashtra, delivering quality products and building our brand, Radha Oil, with a focus on purity and reliability since 2026.
            </p>
            <div className="mt-4 text-primary text-xs font-semibold tracking-widest lotus-divider">
              <span>🙏 Pure. Pious. Trusted.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-amber-200 mb-2">Quick Links</h4>
            <TempleDivider className="mb-4 opacity-60" />
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/manufacturing", label: "Manufacturing" },
                { to: "/bulk", label: "Bulk Supply" },
                { to: "/quality", label: "Quality" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-amber-100/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="text-primary/40 group-hover:text-primary transition-colors">✦</span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-amber-200 mb-2">Our Products</h4>
            <TempleDivider className="mb-4 opacity-60" />
            <div className="flex flex-col gap-2 text-sm text-amber-100/60">
              {["Soybean Oil", "Palm Oil", "Cooking Oil", "Sunflower Oil", "Mustard Oil", "Groundnut Oil"].map((p) => (
                <span key={p} className="flex items-center gap-2">
                  <span className="text-primary/50">🌸</span> {p}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-amber-200 mb-2">Get in Touch</h4>
            <TempleDivider className="mb-4 opacity-60" />
            <div className="flex flex-col gap-3 text-sm">
              <a href={`tel:${content.phoneNumber1.replace(/\s/g, "")}`} className="flex items-center gap-2 text-amber-100/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {content.phoneNumber1}
              </a>
              <a href={`tel:${content.phoneNumber2.replace(/\s/g, "")}`} className="flex items-center gap-2 text-amber-100/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {content.phoneNumber2}
              </a>
              <a href="mailto:info@kawadegoldoils.com" className="flex items-center gap-2 text-amber-100/60 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> info@kawadegoldoils.com
              </a>
              <div className="flex items-start gap-2 text-amber-100/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Shivoor Bangla, Maharashtra, India</span>
              </div>
              <a href="https://www.instagram.com/kawade_gold_oils?igsh=ZmU0eXBvejQyaGlp" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-amber-100/60 hover:text-primary transition-colors mt-2">
                <ColorfulInstagram className="w-5 h-5 shrink-0" /> Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12">
          <TempleDivider className="mb-6 opacity-50" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-amber-100/30">© 2025 Kawade Gold Oils. All rights reserved. 🙏</p>
            <a
              href="https://wa.me/917447297953"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-[0.97]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(30 95% 52%), hsl(42 92% 68%), hsl(30 95% 52%), transparent)" }} />
    </footer>
  );
};

export default Footer;
