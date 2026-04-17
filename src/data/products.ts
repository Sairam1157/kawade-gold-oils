import soybeanOil from "@/assets/soybean-oil.jpg";
import palmOil from "@/assets/palm-oil.jpg";
import cookingOil from "@/assets/cooking-oil.jpg";
import sunflowerOil from "@/assets/sunflower-oil.jpg";
import mustardOil from "@/assets/mustard-oil.jpg";
import groundnutOil from "@/assets/groundnut-oil.jpg";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  description: string;
  details: string;
  packagingTypes: Array<"Pouch" | "Bottle" | "Tin" | "Bulk">;
  hasPouchPackaging: boolean;
  bulkPricingAvailable: boolean;
}

export const products: Product[] = [
  {
    id: "soybean-oil",
    name: "Premium Soybean Oil",
    image: soybeanOil,
    price: "₹180/L",
    category: "Soybean",
    description: "Light, heart-healthy soybean oil refined for everyday cooking. Rich in omega-3 and vitamin E.",
    details: "Our premium soybean oil is triple-refined using advanced cold-pressing technology to preserve natural nutrients. Ideal for frying, sautéing, and baking. Available in 1L, 5L, 15L, and bulk tanker quantities.",
    packagingTypes: ["Pouch", "Bottle", "Tin", "Bulk"],
    hasPouchPackaging: true,
    bulkPricingAvailable: true,
  },
  {
    id: "palm-oil",
    name: "Golden Palm Oil",
    image: palmOil,
    price: "₹150/L",
    category: "Palm",
    description: "Rich, natural palm oil perfect for commercial kitchens and food processing industries.",
    details: "Sourced from sustainable plantations, our palm oil offers excellent heat stability and a naturally rich flavor. Perfect for deep frying and industrial food production. Available in 5L, 15L, and bulk tanker quantities.",
    packagingTypes: ["Pouch", "Tin", "Bulk"],
    hasPouchPackaging: true,
    bulkPricingAvailable: true,
  },
  {
    id: "cooking-oil",
    name: "Kawade Gold Cooking Oil",
    image: cookingOil,
    price: "₹165/L",
    category: "Cooking Oil",
    description: "Our signature blended cooking oil — the perfect balance of taste, health, and affordability.",
    details: "Kawade Gold is our flagship product — a carefully crafted blend that offers the lightness of soybean with the stability of refined oils. Suitable for all types of Indian cooking. Available in 500ml, 1L, 5L, and 15L packs.",
    packagingTypes: ["Pouch", "Bottle", "Tin", "Bulk"],
    hasPouchPackaging: true,
    bulkPricingAvailable: true,
  },
  {
    id: "sunflower-oil",
    name: "Pure Sunflower Oil",
    image: sunflowerOil,
    price: "₹195/L",
    category: "Sunflower",
    description: "Light and cholesterol-free sunflower oil, rich in Vitamin E. Ideal for health-conscious families.",
    details: "Our sunflower oil is extracted from premium quality seeds and refined to retain maximum nutritional value. Low in saturated fats, it's perfect for salad dressings, light frying, and baking. Available in 1L, 2L, 5L, and 15L packs.",
    packagingTypes: ["Pouch", "Bottle", "Tin"],
    hasPouchPackaging: true,
    bulkPricingAvailable: true,
  },
  {
    id: "mustard-oil",
    name: "Kachi Ghani Mustard Oil",
    image: mustardOil,
    price: "₹210/L",
    category: "Mustard",
    description: "Traditional cold-pressed mustard oil with a bold, pungent flavor loved across North India.",
    details: "Our Kachi Ghani mustard oil is extracted using traditional wooden press methods that preserve the natural aroma and nutrients. Rich in MUFA and known for its antibacterial properties. A staple for pickles, tadka, and authentic regional cooking. Available in 500ml, 1L, 5L, and 15L tins.",
    packagingTypes: ["Bottle", "Tin", "Bulk"],
    hasPouchPackaging: false,
    bulkPricingAvailable: true,
  },
  {
    id: "groundnut-oil",
    name: "Premium Groundnut Oil",
    image: groundnutOil,
    price: "₹220/L",
    category: "Groundnut",
    description: "Nutty, aromatic groundnut oil — the secret to flavorful South & West Indian cooking.",
    details: "Cold-pressed from handpicked peanuts, our groundnut oil has a distinct nutty aroma that elevates any dish. High smoke point makes it excellent for deep frying. Rich in antioxidants and heart-healthy fats. Available in 1L, 5L, and 15L packs.",
    packagingTypes: ["Bottle", "Tin", "Bulk"],
    hasPouchPackaging: false,
    bulkPricingAvailable: true,
  },
];
