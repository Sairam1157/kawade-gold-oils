import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

// Animated Hamburger Menu Icon
function AnimatedHamburger({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
    }),
  };

  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20 text-white flex flex-col justify-center items-center gap-1.5 w-10 h-10"
      aria-label="Toggle menu"
    >
      <motion.span
        custom={1}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-white rounded-full origin-center"
      />
      <motion.span
        custom={2}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-white rounded-full"
      />
      <motion.span
        custom={3}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-white rounded-full origin-center"
      />
    </button>
  );
}

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
      <div className="container mx-auto flex items-center justify-between py-2.5 sm:py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Kawade Gold Oils Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain scale-[1.6] sm:scale-[1.8] md:scale-[2.0] origin-left transition-transform duration-300" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-all duration-200 hover:scale-105 ${location.pathname === link.to
                  ? "text-primary gold-gradient-text"
                  : "text-white/90 hover:text-white hover:shadow-sm"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917447297953"
            className="inline-flex items-center gap-2 gold-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97] hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <AnimatedHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-foreground/97 backdrop-blur-md border-t border-white/10 shadow-xl">
          <div className="container mx-auto py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${location.pathname === link.to
                    ? "bg-primary/20 text-background border-l-4 border-primary"
                    : "text-background/90 hover:bg-background/20 hover:text-background"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 mt-2">
              <a
                href="tel:+917447297953"
                className="flex-1 flex items-center justify-center gap-2 gold-gradient px-4 py-3 rounded-full text-sm font-semibold text-primary-foreground"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
