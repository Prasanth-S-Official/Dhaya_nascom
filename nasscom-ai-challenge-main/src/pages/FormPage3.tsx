
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


import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm as useFormContext } from "@/context/FormContext";
import { FormLayout } from "@/components/FormLayout";
import { useToast } from "@/components/ui/use-toast";
import { ApproachNote } from "@/components/ApproachNote";

const FormPage3 = () => {
  const { formData, updateFormData, saveCurrentData, setCurrentStep } = useFormContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    // Optional: If you want to clear state when going back
    // updateFormData({ selectedFields: [], fieldPdfUploads: {} });

    setCurrentStep(2);
    navigate("/form/page2");
  };

  const handleReview = async () => {
    const valid = validateForm(); // Local and safe
    if (!valid) return;

    await saveCurrentData();
    setCurrentStep(4);
    navigate("/form/review");
  };

  const validateForm = () => {
    if (formData.selectedFields.length > 0) {
      const missingUploads = formData.selectedFields.filter(
        (field) => !formData.fieldPdfUploads[field]
      );

      if (missingUploads.length > 0) {
        toast({
          title: "Missing PDF uploads",
          description: `Please upload PDFs for all selected approach fields.`,
          variant: "destructive",
        });
        return false;
      }
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

    // Remove PDF from upload map if checkbox is unchecked
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
      onNext={handleReview}
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
