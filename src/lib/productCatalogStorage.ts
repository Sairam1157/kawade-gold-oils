import type { Product } from "@/data/products";
import { products as baseProducts } from "@/data/products";
import { PRODUCT_IMAGE_PRESETS, type ImagePresetId } from "@/data/productImagePresets";

export const KAWADE_CATALOG_STORAGE_KEY = "kawade-gold-catalog-v1";

export type ProductOverride = Partial<Pick<Product, "name" | "price" | "category" | "image">>;

export type CustomProductStored = {
  id: string;
  name: string;
  price: string;
  category: string;
  imagePreset: ImagePresetId;
  customImageUrl?: string;
  description: string;
  details: string;
  packagingTypes: Product["packagingTypes"];
  hasPouchPackaging: boolean;
  bulkPricingAvailable: boolean;
};

export type CatalogStorageV1 = {
  version: 1;
  overrides: Record<string, ProductOverride>;
  customProducts: CustomProductStored[];
};

export const DEFAULT_CUSTOM_COPY = {
  description: "Premium edible oil — contact us for pack sizes and bulk pricing.",
  details:
    "FSSAI-certified quality. Available in retail packs and bulk. Contact our team for specifications and MOQ.",
  packagingTypes: ["Bottle", "Tin", "Bulk"] as Product["packagingTypes"],
  hasPouchPackaging: true,
  bulkPricingAvailable: true,
};

export function defaultCatalogStorage(): CatalogStorageV1 {
  return { version: 1, overrides: {}, customProducts: [] };
}

function parseStored(raw: string | null): CatalogStorageV1 {
  if (!raw) return defaultCatalogStorage();
  try {
    const data = JSON.parse(raw) as CatalogStorageV1;
    if (data?.version !== 1 || typeof data.overrides !== "object" || !Array.isArray(data.customProducts)) {
      return defaultCatalogStorage();
    }
    return data;
  } catch {
    return defaultCatalogStorage();
  }
}

export function loadCatalogStorage(): CatalogStorageV1 {
  if (typeof window === "undefined") return defaultCatalogStorage();
  return parseStored(localStorage.getItem(KAWADE_CATALOG_STORAGE_KEY));
}

export function saveCatalogStorage(state: CatalogStorageV1): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KAWADE_CATALOG_STORAGE_KEY, JSON.stringify(state));
}

function customToProduct(row: CustomProductStored): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    category: row.category,
    image: row.customImageUrl || PRODUCT_IMAGE_PRESETS[row.imagePreset],
    description: row.description,
    details: row.details,
    packagingTypes: row.packagingTypes,
    hasPouchPackaging: row.hasPouchPackaging,
    bulkPricingAvailable: row.bulkPricingAvailable,
  };
}

export function mergeCatalog(base: Product[], storage: CatalogStorageV1): Product[] {
  const mergedBase = base.map((p) => ({
    ...p,
    ...storage.overrides[p.id],
  }));
  const customs = storage.customProducts.map(customToProduct);
  return [...mergedBase, ...customs];
}

export function getMergedProducts(): Product[] {
  return mergeCatalog(baseProducts, loadCatalogStorage());
}

const baseIds = new Set(baseProducts.map((p) => p.id));

export function isBuiltInProductId(id: string): boolean {
  return baseIds.has(id);
}

export { baseProducts };
