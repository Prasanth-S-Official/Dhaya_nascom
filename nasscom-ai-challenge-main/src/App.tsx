
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

// Import pages
import Index from "./pages/Index";
import FormPage1 from "./pages/FormPage1";
import FormPage2 from "./pages/FormPage2";
import FormPage3 from "./pages/FormPage3";
import ReviewPage from "./pages/ReviewPage";
import SuccessPage from "./pages/SuccessPage";
import NotFound from "./pages/NotFound";
import { FormLayout } from "./components/FormLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FormProvider>
        <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={
              <FormLayout
                onSave={() => console.log("Save clicked")}
                onNext={() => console.log("Next clicked")}
                currentStep={1}
                totalSteps={4}
                isLastStep={false}
              >
                <Outlet /> {/* This renders children routes inside FormLayout */}
              </FormLayout>
            }
          >
            <Route index element={<Navigate to="form/page1" replace />} />
            <Route path="form/page1" element={<FormPage1 />} />
            <Route path="form/page2" element={<FormPage2 />} />
            <Route path="form/page3" element={<FormPage3 />} />
            <Route path="form/review" element={<ReviewPage />} />
            <Route path="form/success" element={<SuccessPage />} />
          </Route>

<Route path="*" element={<NotFound />} />
</Routes>

        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
