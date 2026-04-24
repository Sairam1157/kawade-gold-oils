import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/bulk", label: "Bulk Supply" },
  { to: "/quality", label: "Quality" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-foreground/95 backdrop-blur-md border-b border-white/10 ${scrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Kawade Gold Oils Logo" className="h-10 md:h-12 w-auto object-contain scale-[1.5] md:scale-[1.8] origin-left transition-transform duration-300" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                location.pathname === link.to
                  ? "text-primary gold-gradient-text"
                  : "text-white/90 hover:text-white hover:shadow-sm"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="text-white/90">
            <ThemeToggle />
          </div>
          <a
            href="tel:+917447297953"
            className="inline-flex items-center gap-2 gold-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97] hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20 text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-md border-t border-border animate-reveal-up shadow-lg">
          <div className="container mx-auto py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-primary/20 text-background border-l-4 border-primary"
                    : "text-background/90 hover:bg-background/20 hover:text-background"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+917447297953"
              className="inline-flex items-center justify-center gap-2 gold-gradient px-5 py-3 rounded-full text-sm font-semibold text-primary-foreground mt-3"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
