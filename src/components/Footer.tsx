import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useAboutContent } from "@/context/AboutContentContext";

const Footer = () => {
  const { content } = useAboutContent();

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">K</span>
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-lg text-background block">Kawade</span>
                <span className="text-xs tracking-widest uppercase text-background/50">Gold Oils</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              Trusted edible oil wholesaler and distributor in Maharashtra, delivering quality products and building our brand, Radha Oil, with a focus on purity and reliability since 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
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
                <Link key={link.to} to={link.to} className="text-sm text-background/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Our Products</h4>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <span>Soybean Oil</span>
              <span>Palm Oil</span>
              <span>Cooking Oil</span>
              <span>Sunflower Oil</span>
              <span>Mustard Oil</span>
              <span>Groundnut Oil</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href={`tel:${content.phoneNumber1.replace(/\s/g, "")}`} className="flex items-center gap-2 text-background/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {content.phoneNumber1}
              </a>
              <a href={`tel:${content.phoneNumber2.replace(/\s/g, "")}`} className="flex items-center gap-2 text-background/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {content.phoneNumber2}
              </a>
              <a href="mailto:info@kawadegoldoils.com" className="flex items-center gap-2 text-background/60 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> info@kawadegoldoils.com
              </a>
              <div className="flex items-start gap-2 text-background/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Shivoor Bangla, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">© 2025 Kawade Gold Oils. All rights reserved.</p>
          <a
            href="https://wa.me/917447297953"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2 rounded-full text-sm font-semibold text-background transition-transform active:scale-[0.97]"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
