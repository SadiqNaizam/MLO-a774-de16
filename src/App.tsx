import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; //shadcn sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import generated pages
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* shadcn sonner */}
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Application routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          
          {/* Catch-all 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;