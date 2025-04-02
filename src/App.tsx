import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"; // Make sure React is imported
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import LoadingDisplay from "./components/common/LoadingDisplay";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HubManagement from "./pages/admin/HubManagement";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminSettings from "./pages/admin/AdminSettings";
import HubCheckIn from "./pages/admin/HubCheckIn";

// Create a new query client outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/hubs" element={<HubManagement />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/locations" element={<AdminLocations />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/hub-check-in" element={<HubCheckIn />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/refunds" element={<RefundPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
