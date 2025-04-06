
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { FormProvider } from "./context/FormContext";

// // Import pages
// import Index from "./pages/Index";
// import FormPage1 from "./pages/FormPage1";
// import FormPage2 from "./pages/FormPage2";
// import FormPage3 from "./pages/FormPage3";
// import ReviewPage from "./pages/ReviewPage";
// import SuccessPage from "./pages/SuccessPage";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <FormProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/form">
//               <Route index element={<Navigate to="/form/page1" replace />} />
//               <Route path="page1" element={<FormPage1 />} />
//               <Route path="page2" element={<FormPage2 />} />
//               <Route path="page3" element={<FormPage3 />} />
//               <Route path="review" element={<ReviewPage />} />
//               <Route path="success" element={<SuccessPage />} />
//             </Route>
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </FormProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

// Import pages
import FormPage1 from "./pages/FormPage1";
import FormPage2 from "./pages/FormPage2";
import FormPage3 from "./pages/FormPage3";
import ReviewPage from "./pages/ReviewPage";
import SuccessPage from "./pages/SuccessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/form/page1" replace />} />
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
