
// import React, { useEffect } from "react";
// import CompanyRegistrationForm from "@/components/company/CompanyRegistrationForm";
// import { useToast } from "@/components/ui/use-toast";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "@/context/FormContext";

// const FormPage2 = () => {
//   const { formData, updateFormData } = useForm();
//   const { toast } = useToast();
//   const navigate = useNavigate();
  
//   // Check if user has filled out the first page before accessing this page
//   useEffect(() => {
//     // Only show the error toast and redirect if truly empty values
//     if (!formData.contactName.trim() || 
//         !formData.email.trim() || 
//         !formData.mobile.trim()) {
//       toast({
//         title: "Please complete the first step",
//         description: "You need to fill out your basic information first.",
//         variant: "destructive"
//       });
//       navigate("/form/page1");
//     }
    
//     // Handle legacy business stage values and migrate them to new format
//     const legacyStages = ["Ideation", "Validation", "Early Traction", "Scaling", "Established"];
//     if (formData.businessStage && legacyStages.includes(formData.businessStage)) {
//       // Map legacy stages to new revenue-based stages (approximate mapping)
//       const stageMapping: Record<string, string> = {
//         "Ideation": "No Revenue",
//         "Validation": "No Revenue",
//         "Early Traction": "Early ($0 to $100k)",
//         "Scaling": "Growth ($100k - $1MN)",
//         "Established": "Matured ($1mn+)"
//       };
      
//       updateFormData({
//         businessStage: stageMapping[formData.businessStage] || "No Revenue"
//       });
//     }
//   }, [formData, toast, navigate, updateFormData]);

//   return <CompanyRegistrationForm />;
// };

// export default FormPage2;


import React, { useEffect } from "react";
import CompanyRegistrationForm from "@/components/company/CompanyRegistrationForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";

const FormPage2 = () => {
  const { formData, updateFormData, setCurrentStep } = useForm(); // ✅ added setCurrentStep
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Set current step to 2
    setCurrentStep(2);

    // Redirect if required data from page 1 is missing
    if (
      !formData.contactName.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim()
    ) {
      toast({
        title: "Please complete the first step",
        description: "You need to fill out your basic information first.",
        variant: "destructive",
      });
      navigate("/form/page1");
    }

    // ✅ Migrate legacy business stage if needed
    const legacyStages = [
      "Ideation",
      "Validation",
      "Early Traction",
      "Scaling",
      "Established",
    ];
    if (formData.businessStage && legacyStages.includes(formData.businessStage)) {
      const stageMapping: Record<string, string> = {
        Ideation: "No Revenue",
        Validation: "No Revenue",
        "Early Traction": "Early ($0 to $100k)",
        Scaling: "Growth ($100k - $1MN)",
        Established: "Matured ($1mn+)",
      };

      updateFormData({
        businessStage: stageMapping[formData.businessStage] || "No Revenue",
      });
    }
  }, [formData, toast, navigate, updateFormData, setCurrentStep]);

  return <CompanyRegistrationForm />;
};

export default FormPage2;
