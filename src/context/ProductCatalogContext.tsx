import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";
import {
  type CatalogStorageV1,
  type CustomProductStored,
  type ProductOverride,
  KAWADE_CATALOG_STORAGE_KEY,
  defaultCatalogStorage,
  loadCatalogStorage,
  mergeCatalog,
  saveCatalogStorage,
  baseProducts,
} from "@/lib/productCatalogStorage";

type ProductCatalogContextValue = {
  products: Product[];
  storage: CatalogStorageV1;
  updateBuiltInProduct: (id: string, patch: ProductOverride) => void;
  clearBuiltInOverrides: (id: string) => void;
  addCustomProduct: (input: Pick<CustomProductStored, "name" | "price" | "category" | "imagePreset" | "customImageUrl">) => void;
  updateCustomProduct: (id: string, patch: Partial<CustomProductStored>) => void;
  removeCustomProduct: (id: string) => void;
  resetEntireCatalog: () => void;
  replaceCatalog: (next: CatalogStorageV1) => void;
};

const ProductCatalogContext = createContext<ProductCatalogContextValue | null>(null);

export function ProductCatalogProvider({ children }: { children: ReactNode }) {
  const [storage, setStorage] = useState<CatalogStorageV1>(() => loadCatalogStorage());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KAWADE_CATALOG_STORAGE_KEY && e.newValue) {
        try {
          const data = JSON.parse(e.newValue) as CatalogStorageV1;
          if (data?.version === 1) setStorage(data);
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /** If this browser has no saved catalog yet, load optional `public/kawade-catalog.json` (for deployed sites). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = localStorage.getItem(KAWADE_CATALOG_STORAGE_KEY);
    if (existing) return;
    fetch("/kawade-catalog.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CatalogStorageV1 | null) => {
        if (data?.version === 1 && typeof data.overrides === "object" && Array.isArray(data.customProducts)) {
          setStorage(data);
          saveCatalogStorage(data);
        }
      })
      .catch(() => {
        /* no file is fine */
      });
  }, []);

  const persist = useCallback((next: CatalogStorageV1) => {
    setStorage(next);
    saveCatalogStorage(next);
  }, []);

  const products = useMemo(() => mergeCatalog(baseProducts, storage), [storage]);

  const updateBuiltInProduct = useCallback(
    (id: string, patch: ProductOverride) => {
      const prev = storage.overrides[id] ?? {};
      persist({
        ...storage,
        overrides: { ...storage.overrides, [id]: { ...prev, ...patch } },
      });
    },
    [storage, persist],
  );

  const clearBuiltInOverrides = useCallback(
    (id: string) => {
      const { [id]: _, ...rest } = storage.overrides;
      persist({ ...storage, overrides: rest });
    },
    [storage, persist],
  );

  const addCustomProduct = useCallback(
    (input: Pick<CustomProductStored, "name" | "price" | "category" | "imagePreset" | "customImageUrl">) => {
      const slug =
        input.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "oil";
      const id = `custom-${slug}-${Date.now().toString(36)}`;
      const row: CustomProductStored = {
        id,
        name: input.name.trim(),
        price: input.price.trim(),
        category: input.category.trim() || "Cooking Oil",
        imagePreset: input.imagePreset,
        customImageUrl: input.customImageUrl,
        description:
          "Premium edible oil — contact us for pack sizes and bulk pricing.",
        details:
          "FSSAI-certified quality. Available in retail packs and bulk. Contact our team for specifications and MOQ.",
        packagingTypes: ["Bottle", "Tin", "Bulk"],
        hasPouchPackaging: true,
        bulkPricingAvailable: true,
      };
      persist({
        ...storage,
        customProducts: [...storage.customProducts, row],
      });
    },
    [storage, persist],
  );

  const updateCustomProduct = useCallback(
    (id: string, patch: Partial<CustomProductStored>) => {
      persist({
        ...storage,
        customProducts: storage.customProducts.map((p) =>
          p.id === id ? { ...p, ...patch, id: p.id } : p,
        ),
      });
    },
    [storage, persist],
  );

  const removeCustomProduct = useCallback(
    (id: string) => {
      persist({
        ...storage,
        customProducts: storage.customProducts.filter((p) => p.id !== id),
      });
    },
    [storage, persist],
  );

  const resetEntireCatalog = useCallback(() => {
    const next = defaultCatalogStorage();
    persist(next);
  }, [persist]);

  const replaceCatalog = useCallback(
    (next: CatalogStorageV1) => {
      if (next?.version !== 1) return;
      persist(next);
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      products,
      storage,
      updateBuiltInProduct,
      clearBuiltInOverrides,
      addCustomProduct,
      updateCustomProduct,
      removeCustomProduct,
      resetEntireCatalog,
      replaceCatalog,
    }),
    [
      products,
      storage,
      updateBuiltInProduct,
      clearBuiltInOverrides,
      addCustomProduct,
      updateCustomProduct,
      removeCustomProduct,
      resetEntireCatalog,
      replaceCatalog,
    ],
  );

  return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>;
}

export function useProductCatalog() {
  const ctx = useContext(ProductCatalogContext);
  if (!ctx) throw new Error("useProductCatalog must be used within ProductCatalogProvider");
  return ctx;
}
