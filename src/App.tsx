import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductCatalogProvider } from "@/context/ProductCatalogContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AboutContentProvider } from "@/context/AboutContentContext";
import { HomeContentProvider } from "@/context/HomeContentContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Manufacturing from "./pages/Manufacturing";
import PrivateLabel from "./pages/PrivateLabel";
import Quality from "./pages/Quality";
import Bulk from "./pages/Bulk";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductCatalogProvider>
      <AdminAuthProvider>
        <AboutContentProvider>
          <HomeContentProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Navbar />
                <main>
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/manufacturing" element={<Manufacturing />} />
                      <Route path="/private-label" element={<PrivateLabel />} />
                      <Route path="/quality" element={<Quality />} />
                      <Route path="/bulk" element={<Bulk />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageTransition>
                </main>
                <Footer />
              </BrowserRouter>
            </TooltipProvider>
          </HomeContentProvider>
        </AboutContentProvider>
      </AdminAuthProvider>
    </ProductCatalogProvider>
  </QueryClientProvider>
);

export default App;
