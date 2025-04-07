

import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider } from "./context/FormContext";

// Import pages
import FormPage1 from "./pages/FormPage1";
import FormPage2 from "./pages/FormPage2";
import FormPage3 from "./pages/FormPage3";
import ReviewPage from "./pages/ReviewPage";
import SuccessPage from "./pages/SuccessPage";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";


const RedirectOnReload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isReload = navEntry.type === "reload";
    if (isReload && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;

      // ✅ Clear storage
      localStorage.clear();
      sessionStorage.clear();

      // ✅ Redirect to login on any reload
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null;
};


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FormProvider>
        <BrowserRouter>
          <RedirectOnReload />
          <Routes>
            {/* <Route path="/" element={<Navigate to="/form/page1" replace />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/form">
              <Route path="page1" element={<FormPage1 />} />
              <Route path="page2" element={<FormPage2 />} />
              <Route path="page3" element={<FormPage3 />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="success" element={<SuccessPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
