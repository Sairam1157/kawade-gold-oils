import { useMemo, useState } from "react";
import { Search, Sparkles, Droplet, Filter, Package, Tag, Flame, Crown, Leaf, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import TempleDivider from "@/components/TempleDivider";
import { useProductCatalog } from "@/context/ProductCatalogContext";

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

const Products = () => {
  const { products } = useProductCatalog();
  
  // Filter products by packaging type (exclude Bulk-only products)
  const bottleProducts = useMemo(() => 
    products.filter(p => 
      (p.packagingTypes?.includes("Bottle") || p.packagingTypes?.includes("PET")) &&
      !p.packagingTypes?.every(pack => pack === "Bulk")
    ),
    [products]
  );
  
  const pouchProducts = useMemo(() => 
    products.filter(p => 
      p.packagingTypes?.includes("Pouch") &&
      !p.packagingTypes?.every(pack => pack === "Bulk")
    ),
    [products]
  );
  
  const tinProducts = useMemo(() => 
    products.filter(p => 
      p.packagingTypes?.includes("Tin") &&
      !p.packagingTypes?.every(pack => pack === "Bulk")
    ),
    [products]
  );

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))]
      .filter(cat => cat !== "Cooking Oil")
      .sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [products]);

  const packagings = useMemo(() => {
    const allPacks = products.flatMap((p) => p.packagingTypes || []);
    const unique = [...new Set(allPacks)]
      .filter(pack => pack !== "Bulk")
      .sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPackaging, setSelectedPackaging] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    // First, separate products into individual items for each packaging type
    const unrolledProducts: any[] = [];
    products.forEach((p) => {
      if (p.packagingTypes && p.packagingTypes.length > 0) {
        p.packagingTypes.forEach((pack) => {
          let displayImage = p.image;
          let displayName = `${p.name} - ${pack}`;
          let displayDescription = p.description;

          if (pack === "Tin") {
            if (p.id === "soybean-oil") {
              displayImage = "/soybean-tin.jpg";
              displayName = "Radha Soya Oil Tin";
              // We'll update description here if needed
            }
            if (p.id === "sunflower-oil") {
              displayImage = "/sunflower-tin.jpg";
              displayName = "Radha Surya Sunflower Oil Tin";
            }
            if (p.id === "groundnut-oil") {
              displayImage = "/groundnut-tin.jpg";
              displayName = "Radha Shing Groundnut Oil Tin";
            }
            if (p.id === "palm-oil") {
              displayImage = "/palm-tin.jpg";
              displayName = "Radha Refined Palm Oil Tin";
            }
            if (p.id === "mustard-oil") {
              displayImage = "/mustard-tin.jpg";
              displayName = "Radha Refined Mustard Oil Tin";
            }
          }

          unrolledProducts.push({
            ...p,
            id: `${p.id}-${pack.toLowerCase()}`,
            name: displayName,
            description: displayDescription,
            image: displayImage,
            packagingTypes: [pack],
            hasPouchPackaging: pack === "Pouch",
          });
        });
      } else {
        unrolledProducts.push(p);
      }
    });

    // Then, apply the filters
    return unrolledProducts.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchPackaging = selectedPackaging === "All" || (p.packagingTypes && p.packagingTypes.includes(selectedPackaging as any));
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchPackaging && matchSearch;
    });
  }, [products, selectedCategory, selectedPackaging, searchQuery]);

  return (
    <div className="pt-24 pb-16 relative overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
      
      {/* Temple Pillars */}
      <div className="absolute left-6 md:left-12 top-32 bottom-32 w-6 temple-pillar opacity-40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 top-32 bottom-32 w-6 temple-pillar opacity-40 pointer-events-none" />
      
      {/* Subtle Om Watermark */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 text-[180px] font-serif text-primary/[0.03] pointer-events-none select-none">ॐ</div>
      
      {/* Corner Decorations */}
      <div className="absolute top-24 left-8 text-primary/10 text-3xl rotate-12">&#10047;</div>
      <div className="absolute top-24 right-8 text-primary/10 text-3xl -rotate-12">&#10047;</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Attractive Header Section */}
        <motion.div 
          className="py-12 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Crown Icon */}
          <motion.div 
            className="flex justify-center mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border border-primary/20">
              <Crown className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          
          <SectionHeading
            label="Our Products"
            title="Premium Edible Oils"
            description="Browse our complete range of pure, FSSAI-certified edible oils — available in retail packs and bulk tanker quantities for homes, restaurants, and industries."
          />
          
          {/* Sanskrit blessing with flames */}
          <motion.div 
            className="flex items-center justify-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Flame className="w-4 h-4 text-primary/60" />
            <p className="text-lg italic text-primary font-bold" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              "अन्नम् ब्रह्म" — Food is divine
            </p>
            <Flame className="w-4 h-4 text-primary/60" />
          </motion.div>
          <TempleDivider className="max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Sliding Banner */}
        <div className="relative overflow-hidden py-4 mb-10 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl">
          <motion.div 
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -800] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 text-primary/80">
                <span className="text-sm font-bold tracking-widest flex items-center gap-2"><Star className="w-4 h-4" /> 100% PURE OILS</span>
                <span className="text-2xl">&#10047;</span>
                <span className="text-sm font-bold tracking-widest flex items-center gap-2"><Leaf className="w-4 h-4" /> FSSAI CERTIFIED</span>
                <span className="text-2xl">&#10047;</span>
                <span className="text-sm font-bold tracking-widest flex items-center gap-2"><Crown className="w-4 h-4" /> RADHA BRAND</span>
                <span className="text-2xl">&#10047;</span>
                <span className="text-sm font-bold tracking-widest flex items-center gap-2"><Sparkles className="w-4 h-4" /> TRADITIONAL PROCESS</span>
                <span className="text-2xl">&#10047;</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filters Section - Redesigned */}
        <RevealSection className="mb-10">
          <motion.div 
            className="bg-gradient-to-br from-card to-muted/20 rounded-3xl p-6 md:p-8 border-2 border-primary/10 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Filter Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/10">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Filter Products</h3>
              <div className="flex-1" />
              <span className="text-sm text-muted-foreground">{filtered.length} products found</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-primary/60" />
                  <span className="text-sm font-semibold text-muted-foreground">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                        ? "gold-gradient text-primary-foreground shadow-md"
                        : "bg-background border border-border hover:border-primary/30 text-muted-foreground"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Packaging Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-primary/60" />
                  <span className="text-sm font-semibold text-muted-foreground">Packaging</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {packagings.map((pack) => (
                    <button
                      key={pack}
                      onClick={() => setSelectedPackaging(pack)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPackaging === pack
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                    >
                      {pack}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </RevealSection>

        {/* UNIQUE: Parallax grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative">
                <ProductCard {...p} />
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
