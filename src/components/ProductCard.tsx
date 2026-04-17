import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  description: string;
  packagingTypes: Array<"Pouch" | "Bottle" | "Tin" | "Bulk">;
  hasPouchPackaging: boolean;
  bulkPricingAvailable: boolean;
  delay?: number;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  category,
  description,
  packagingTypes,
  hasPouchPackaging,
  bulkPricingAvailable,
  delay = 0,
}: ProductCardProps) => (
  <div
    className="group bg-card rounded-2xl overflow-hidden shadow-md shadow-foreground/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative overflow-hidden aspect-square">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
        {category}
      </span>
    </div>
    <div className="p-6">
      <h3 className="font-display font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {packagingTypes.map((pack) => (
          <span key={pack} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {pack}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {hasPouchPackaging && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            Pouch Packaging Available
          </span>
        )}
        {bulkPricingAvailable && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
            Bulk Pricing Available
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-primary text-lg">{price}</span>
        <div className="flex items-center gap-3">
          <Link
            to={`/contact?product=${id}`}
            className="text-sm font-semibold text-secondary hover:text-red-dark transition-colors"
          >
            Enquire Now
          </Link>
          <a
            href={`https://wa.me/917447297953?text=${encodeURIComponent(`Hi, I need bulk pricing for ${name}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Request Bulk Quote
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
