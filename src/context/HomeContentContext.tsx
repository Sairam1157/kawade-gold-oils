import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface HomeContent {
  stats: Stat[];
  testimonials: Testimonial[];
}

const HOME_CONTENT_STORAGE_KEY = "kawade-home-content-v1";

const defaultStats: Stat[] = [
  { value: "25+", label: "Years Experience" },
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Tons Monthly Output" },
  { value: "7", label: "Oil Varieties" },
];

const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "Rajesh Mehta", role: "Restaurant Owner, Mumbai", text: "Kawade Gold Oils has been our trusted supplier for 3 years. Consistent quality and always on time. Their bulk delivery never misses a deadline.", rating: 5 },
  { id: "2", name: "Priya Sharma", role: "Homemaker, Pune", text: "The soybean oil is so light and healthy. My family loves the taste of food cooked in it! We've switched completely to Kawade Gold.", rating: 5 },
  { id: "3", name: "Vikram Patil", role: "Wholesale Distributor", text: "Best pricing in the market with no compromise on purity. Excellent for our retail chain across Maharashtra.", rating: 5 },
  { id: "4", name: "Anita Deshmukh", role: "Catering Business, Nashik", text: "We use their groundnut oil for all our wedding catering. The aroma and taste are unmatched. Our clients always ask what oil we use!", rating: 5 },
  { id: "5", name: "Suresh Kulkarni", role: "Kirana Store Owner, Solapur", text: "Kawade Gold sells faster than any other oil brand in my shop. Customers trust the quality and keep coming back for more.", rating: 4 },
  { id: "6", name: "Meena Joshi", role: "Health-Conscious Homemaker, Satara", text: "I switched to their sunflower oil on my doctor's advice. It's genuinely light and pure — you can taste the difference in every meal.", rating: 5 },
];

function defaultHomeContent(): HomeContent {
  return {
    stats: defaultStats,
    testimonials: defaultTestimonials,
  };
}

interface HomeContentContextType {
  content: HomeContent;
  setContent: (content: HomeContent) => void;
  resetContent: () => void;
}

const HomeContentContext = createContext<HomeContentContextType | undefined>(undefined);

export function HomeContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<HomeContent>(() => {
    if (typeof window === "undefined") return defaultHomeContent();
    try {
      const stored = localStorage.getItem(HOME_CONTENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          stats: parsed.stats || defaultStats,
          testimonials: parsed.testimonials || defaultTestimonials,
        };
      }
    } catch {
      // Fall through to default
    }
    return defaultHomeContent();
  });

  const setContentAndPersist = useCallback((newContent: HomeContent) => {
    setContent(newContent);
    localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(newContent));
  }, []);

  const resetContent = useCallback(() => {
    const defaults = defaultHomeContent();
    setContent(defaults);
    localStorage.removeItem(HOME_CONTENT_STORAGE_KEY);
    toast.message("Home content reset to defaults");
  }, []);

  return (
    <HomeContentContext.Provider value={{ content, setContent: setContentAndPersist, resetContent }}>
      {children}
    </HomeContentContext.Provider>
  );
}

export function useHomeContent() {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error("useHomeContent must be used within HomeContentProvider");
  }
  return context;
}
