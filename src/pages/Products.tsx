import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
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
  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [products]);

  const packagings = useMemo(() => {
    const allPacks = products.flatMap((p) => p.packagingTypes || []);
    const unique = [...new Set(allPacks)].sort((a, b) => a.localeCompare(b));
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
    <div className="pt-24 pb-16">
      <div className="container mx-auto">
        {/* Header */}
        <div className="py-12">
          <SectionHeading
            label="Our Products"
            title="Premium Edible Oils"
            description="Browse our complete range of pure, FSSAI-certified edible oils — available in retail packs and bulk tanker quantities for homes, restaurants, and industries."
          />
        </div>

        {/* Filters */}
        <RevealSection className="mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                  selectedCategory === cat
                    ? "gold-gradient text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Packaging Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-muted-foreground mr-2">Packaging:</span>
            {packagings.map((pack) => (
              <button
                key={pack}
                onClick={() => setSelectedPackaging(pack)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all active:scale-[0.97] ${
                  selectedPackaging === pack
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-secondary/20"
                }`}
              >
                {pack}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search oils..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </RevealSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <RevealSection key={p.id} delay={i * 100}>
              <ProductCard {...p} />
            </RevealSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No products found matching your criteria.
          </div>
        )}

        {/* Bulk Order CTA */}
        <RevealSection className="mt-20">
          <div className="red-gradient rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">Need Bulk Quantities?</h2>
            <p className="text-secondary-foreground/80 max-w-md mx-auto mb-6">
              We supply edible oils in tanker-loads for commercial and industrial use. Get special wholesale pricing.
            </p>
            <a
              href="https://wa.me/917447297953?text=Hi%2C%20I%27m%20interested%20in%20bulk%20oil%20orders"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary-foreground px-8 py-3.5 rounded-full font-semibold text-secondary transition-transform active:scale-[0.97]"
            >
              Request Bulk Quote
            </a>
          </div>
        </RevealSection>
      </div>
    </div>
  );
};

export default Products;
