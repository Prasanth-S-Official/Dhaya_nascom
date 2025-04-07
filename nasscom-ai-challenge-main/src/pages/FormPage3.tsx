
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm as useFormContext } from "@/context/FormContext";
// import { FormLayout } from "@/components/FormLayout";
// import { useToast } from "@/components/ui/use-toast";
// import { ApproachNote } from "@/components/ApproachNote";

// const FormPage3 = () => {
//   const { formData, updateFormData, saveCurrentData, setCurrentStep } = useFormContext();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleBack = () => {
//     navigate("/form/page2");
//   };

//   const handleReview = async () => {
//     if (validateForm()) {
//       await saveCurrentData();
//       setCurrentStep(4);
//       navigate("/form/review");
//     }
//   };

//   const validateForm = () => {
//     // Check if any fields are selected but PDFs are not uploaded
//     if (formData.selectedFields.length > 0) {
//       const missingUploads = formData.selectedFields.filter(
//         field => !formData.fieldPdfUploads[field]
//       );
      
//       if (missingUploads.length > 0) {
//         toast({
//           title: "Missing PDF uploads",
//           description: `Please upload PDFs for all selected approach fields.`,
//           variant: "destructive"
//         });
//         return false;
//       }
//     }
    
//     return true;
//   };

//   const handleSave = async () => {
//     await saveCurrentData();
//     toast({
//       title: "Progress saved",
//       description: "Your form progress has been saved.",
//     });
//   };

//   const handleFieldToggle = (field: string) => {
//     const newSelectedFields = formData.selectedFields.includes(field)
//       ? formData.selectedFields.filter(f => f !== field)
//       : [...formData.selectedFields, field];
    
//     updateFormData({ selectedFields: newSelectedFields });
//   };

//   const handleUploadChange = (field: string, file: File | null) => {
//     const newFieldPdfUploads = {
//       ...formData.fieldPdfUploads,
//       [field]: file
//     };
    
//     updateFormData({ fieldPdfUploads: newFieldPdfUploads });
//   };

//   return (
//     <FormLayout
//       onSave={handleSave}
//       onNext={handleReview}
//       onBack={handleBack}
//       currentStep={3}
//       totalSteps={4}
//       isLastStep={false}
//     >
//       <form className="form-section">
//         <h2 className="form-header">Approach Note Submission</h2>
        
//         <div className="space-y-6">
//           <ApproachNote
//             selectedFields={formData.selectedFields}
//             fieldPdfUploads={formData.fieldPdfUploads}
//             onFieldToggle={handleFieldToggle}
//             onUploadChange={handleUploadChange}
//           />
//         </div>
//       </form>
//     </FormLayout>
//   );
// };

// export default FormPage3;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm as useFormContext } from "@/context/FormContext";
import { FormLayout } from "@/components/FormLayout";
import { useToast } from "@/components/ui/use-toast";
import { ApproachNote } from "@/components/ApproachNote";

const FormPage3 = () => {
  const { formData, updateFormData, saveCurrentData, setCurrentStep } = useFormContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set step only
    setCurrentStep(3);
    // ✅ DO NOT validate anything here
  }, [setCurrentStep]);

  const handleBack = () => {
    setCurrentStep(2);
    navigate("/form/page2");
  };

  const handleReview = async () => {
    const valid = validateForm();
    if (!valid) return;

    await saveCurrentData();
    setCurrentStep(4);
    navigate("/form/review");
  };

  // const validateForm = () => {
  //   if (!formData || !formData.selectedFields) return true;

  //   const missingUploads = formData.selectedFields.filter(
  //     (field) => !formData.fieldPdfUploads?.[field]
  //   );

  //   if (missingUploads.length > 0) {
  //     toast({
  //       title: "Missing PDF uploads",
  //       description: `Please upload PDFs for all selected approach fields.`,
  //       variant: "destructive",
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const validateForm = () => {
    if (!formData) return false;
  
    const { selectedFields, fieldPdfUploads } = formData;
    const errors: string[] = [];
  
    // ✅ Ensure at least one checkbox is selected
    if (!selectedFields || selectedFields.length === 0) {
      errors.push("Please select at least one use case field.");
    }
  
    // ✅ Ensure all selected fields have a PDF uploaded
    const missingUploads = selectedFields.filter((field) => !fieldPdfUploads?.[field]);
    if (missingUploads.length > 0) {
      errors.push("Please upload PDFs for all selected approach fields.");
    }
  
    if (errors.length > 0) {
      toast({
        title: "Missing PDF uploads",
        description: errors.join("\n"),
        variant: "destructive",
      });
      return false;
    }
  
    return true;
  };
  

  const handleSave = async () => {
    await saveCurrentData();
    toast({
      title: "Progress saved",
      description: "Your form progress has been saved.",
    });
  };

  const handleFieldToggle = (field: string) => {
    const newSelectedFields = formData.selectedFields.includes(field)
      ? formData.selectedFields.filter((f) => f !== field)
      : [...formData.selectedFields, field];

    const newFieldPdfUploads = { ...formData.fieldPdfUploads };
    if (!newSelectedFields.includes(field)) {
      delete newFieldPdfUploads[field];
    }

    updateFormData({
      selectedFields: newSelectedFields,
      fieldPdfUploads: newFieldPdfUploads,
    });
  };

  const handleUploadChange = (field: string, file: File | null) => {
    const newFieldPdfUploads = {
      ...formData.fieldPdfUploads,
      [field]: file,
    };

    updateFormData({ fieldPdfUploads: newFieldPdfUploads });
  };

  return (
    <FormLayout
      onSave={handleSave}
      onNext={handleReview} // ✅ Only runs on Next button click
      onBack={handleBack}
      currentStep={3}
      totalSteps={4}
      isLastStep={false}
    >
      <form className="form-section">
        <h2 className="form-header">Approach Note Submission</h2>

        <div className="space-y-6">
          <ApproachNote
            selectedFields={formData.selectedFields}
            fieldPdfUploads={formData.fieldPdfUploads}
            onFieldToggle={handleFieldToggle}
            onUploadChange={handleUploadChange}
          />
        </div>
      </form>
    </FormLayout>
  );
};

export default FormPage3;
