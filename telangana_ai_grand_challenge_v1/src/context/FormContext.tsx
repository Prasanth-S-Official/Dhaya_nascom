import React, { createContext, useContext, useState } from "react";
import { saveFormSubmission } from "@/services/formSubmissionService";
import { useToast } from "@/components/ui/use-toast";

export interface FormData {
  // Page 1
  contactName: string;
  email: string;
  mobile: string;
  startupName: string;
  organizationName: string;
  website: string;

  // Page 2
  isRegisteredInIndia: "Yes" | "No" | "";
  isDpiitCertified: "Yes" | "No" | "";
  dpiitNumber: string;
  dpiitCertificate: File | null;
  incorporationDate: Date | null;
  incorporationCertificate: File | null;
  businessStage: string;
  industries: string[];
  otherIndustry: string;
  city: string;
  femaleFounders: string;
  employees: string;
  motivation: string;
  pitchDeck: File | null;
  
  // Approach Note (Page 3)
  selectedFields: string[];
  fieldPdfUploads: Record<string, File | null>;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  formSubmitted: boolean;
  isSavingData: boolean;
  saveCurrentData: () => Promise<{ success: boolean, error?: string } | undefined>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formSubmissionError: string | null;
  setFormSubmissionError: (error: string | null) => void;
}

const initialFormData: FormData = {
  contactName: "",
  email: "",
  mobile: "",
  startupName: "",
  organizationName: "",
  website: "",

  isRegisteredInIndia: "",
  isDpiitCertified: "",
  dpiitNumber: "",
  dpiitCertificate: null,
  incorporationDate: null,
  incorporationCertificate: null,
  businessStage: "",
  industries: [],
  otherIndustry: "",
  city: "",
  femaleFounders: "",
  employees: "",
  motivation: "",
  pitchDeck: null,
  
  // Approach Note
  selectedFields: [],
  fieldPdfUploads: {}
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmissionError, setFormSubmissionError] = useState<string | null>(null);
  const { toast } = useToast();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear any previous errors when form is modified
    if (formSubmissionError) setFormSubmissionError(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormSubmitted(false);
    setCurrentStep(1);
    setFormSubmissionError(null);
  };

  const saveCurrentData = async (): Promise<{ success: boolean, error?: string } | undefined> => {
    try {
      console.log("Saving form progress locally");
      
      // Log the complete form data
      console.log("Form Data to be saved:", {
        ...formData,
        // Log file information instead of the actual file objects
        dpiitCertificate: formData.dpiitCertificate ? {
          name: formData.dpiitCertificate.name,
          size: formData.dpiitCertificate.size,
          type: formData.dpiitCertificate.type
        } : null,
        incorporationCertificate: formData.incorporationCertificate ? {
          name: formData.incorporationCertificate.name,
          size: formData.incorporationCertificate.size,
          type: formData.incorporationCertificate.type
        } : null,
        pitchDeck: formData.pitchDeck ? {
          name: formData.pitchDeck.name,
          size: formData.pitchDeck.size,
          type: formData.pitchDeck.type
        } : null,
        fieldPdfUploads: Object.fromEntries(
          Object.entries(formData.fieldPdfUploads).map(([key, file]) => [
            key,
            file ? {
              name: file.name,
              size: file.size,
              type: file.type
            } : null
          ])
        )
      });
      
      // Store in localStorage as a backup
      localStorage.setItem("startupFormData", JSON.stringify({
        ...formData,
        // Remove file objects as they can't be serialized
        dpiitCertificate: formData.dpiitCertificate ? formData.dpiitCertificate.name : null,
        incorporationCertificate: formData.incorporationCertificate ? formData.incorporationCertificate.name : null,
        pitchDeck: formData.pitchDeck ? formData.pitchDeck.name : null,
        // Handle the field PDF uploads
        fieldPdfUploads: Object.fromEntries(
          Object.entries(formData.fieldPdfUploads).map(([key, file]) => [key, file ? file.name : null])
        )
      }));
      
      return { success: true };
    } catch (error) {
      console.error("Error saving form data:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setFormSubmissionError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const submitForm = async () => {
    setIsSavingData(true);
    setFormSubmissionError(null);
    
    try {
      // Save form data to Supabase
      const result = await saveFormSubmission(formData);
      
      if (!result.success) {
        setFormSubmissionError(result.error || "An unexpected error occurred");
        toast({
          title: "Error submitting form",
          description: result.error || "An unexpected error occurred.",
          variant: "destructive",
        });
        return;
      }
      
      // Set form as submitted
      setFormSubmitted(true);
      
      toast({
        title: "Form submitted successfully",
        description: "Your application has been submitted.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setFormSubmissionError(errorMessage);
      toast({
        title: "Error submitting form",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSavingData(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        submitForm,
        formSubmitted,
        isSavingData,
        saveCurrentData,
        currentStep,
        setCurrentStep,
        formSubmissionError,
        setFormSubmissionError
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
