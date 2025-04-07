import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";
import { FormLayout } from "@/components/FormLayout";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyBusinessInfo } from "@/components/company/CompanyBusinessInfo";
import { CompanyMotivation } from "@/components/company/CompanyMotivation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FileText, X, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CompanyRegistrationForm = () => {
  const { 
    formData, 
    updateFormData, 
    saveCurrentData, 
    isSavingData, 
    setCurrentStep, 
    formSubmissionError,
    setFormSubmissionError
  } = useForm();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (formSubmissionError) {
      setFormSubmissionError(null);
    }
  }, []);

  const handleChange = (name: string, value: any) => {
    updateFormData({ [name]: value });
    if (formSubmissionError) setFormSubmissionError(null);
  };

  const handleBack = () => {
    navigate("/form/page1");
  };
  
 

  const validateForm = (): boolean => {
    const {
      incorporationDate,
      incorporationCertificate,
      dpiitNumber,
      dpiitCertificate,
      businessStage,
      industries,
      city,
      employees,
      motivation,
      otherIndustry,
      pitchDeck,
    } = formData;
  
    const errors: string[] = [];
  
    // 1. Incorporation fields
    if (!incorporationDate) errors.push("Incorporation Date");
    if (!incorporationCertificate) errors.push("Incorporation Certificate");
  
    // 2. DPIIT fields
    if (!dpiitNumber?.trim()) errors.push("DPIIT Number");
    if (!dpiitCertificate) errors.push("DPIIT Certificate");
  
    // 3. General required fields
    if (!businessStage) errors.push("Business Stage");
    if (!industries || industries.length === 0) errors.push("Industries");
    if (!city) errors.push("City");
    if (!employees) errors.push("Number of Employees");
  
    // 4. Other industry required if "Others" selected
    if (industries.includes("Others") && !otherIndustry) {
      errors.push("Please specify the 'Other' industry.");
    }
  
    // 5. Motivation word limit
    if (motivation) {
      const wordCount = motivation.trim().split(/\s+/).length;
      if (wordCount > 100) {
        errors.push("Motivation should be 100 words or less.");
      }
    }
  
    // 6. Pitch deck check
    if (!pitchDeck) {
      errors.push("Please share your pitch deck (product/company deck).");
    }
  
    // 7. Show collected errors if any
    if (errors.length > 0) {
      toast({
        title: "Missing required fields",
        description: errors.join("\n"),
        variant: "destructive",
      });
      return false;
    }
  
    return true;
  };
  
  

  const handleNext = async () => {
    if (validateForm()) {
      setFormSubmissionError(null);
      try {
        const result = await saveCurrentData();
        if (result && !result.success) {
          toast({
            title: "Error saving form",
            description: result.error || "An unexpected error occurred",
            variant: "destructive"
          });
          return;
        }
        
        setCurrentStep(3);
        navigate("/form/page3");
      } catch (error) {
        console.error("Error during save and navigation:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        toast({
          title: "Error saving form",
          description: errorMessage,
          variant: "destructive"
        });
      }
    }
  };
  
  const handleSave = async () => {
    setFormSubmissionError(null);
    try {
      const result = await saveCurrentData();
      if (result && !result.success) {
        toast({
          title: "Error saving data",
          description: result.error || "An unexpected error occurred",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Progress saved",
        description: "Your form progress has been saved.",
      });
    } catch (error) {
      console.error("Error during save:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error saving data",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const previewPdf = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  const handleRemoveFile = (fieldName: string) => {
    updateFormData({ [fieldName]: null });
    toast({
      title: "File removed",
      description: "The file has been removed.",
    });
  };

  return (
    <FormLayout
      onSave={handleSave}
      onNext={handleNext}
      onBack={handleBack}
      currentStep={2}
      totalSteps={4}
      isLastStep={false}
    >
      {formSubmissionError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error saving data</AlertTitle>
          <AlertDescription>{formSubmissionError}</AlertDescription>
        </Alert>
      )}
      
      <form className="form-section">
        <h2 className="form-header">Company Details</h2>
        
        <CompanyBasicInfo 
          formData={formData} 
          onValueChange={handleChange} 
        />

        {formData.isDpiitCertified === "Yes" && formData.dpiitCertificate && (
          <div className="flex gap-2 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FileText className="h-4 w-4 mr-1" /> Preview DPIIT Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>DPIIT Certificate</DialogTitle>
                </DialogHeader>
                <div className="w-full h-[70vh]">
                  <iframe 
                    src={previewPdf(formData.dpiitCertificate)} 
                    className="w-full h-full" 
                    title="DPIIT Certificate Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-800 flex items-center text-sm"
              onClick={() => handleRemoveFile("dpiitCertificate")}
            >
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        )}

        {formData.incorporationCertificate && (
          <div className="flex gap-2 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FileText className="h-4 w-4 mr-1" /> Preview Incorporation Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Incorporation Certificate</DialogTitle>
                </DialogHeader>
                <div className="w-full h-[70vh]">
                  <iframe 
                    src={previewPdf(formData.incorporationCertificate)} 
                    className="w-full h-full" 
                    title="Incorporation Certificate Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-800 flex items-center text-sm"
              onClick={() => handleRemoveFile("incorporationCertificate")}
            >
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        )}

        <CompanyBusinessInfo 
          formData={formData} 
          onValueChange={handleChange} 
        />

        <CompanyMotivation 
          formData={formData} 
          onValueChange={handleChange} 
        />
        
        {formData.pitchDeck && (
          <div className="flex gap-2 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FileText className="h-4 w-4 mr-1" /> Preview Pitch Deck
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Pitch Deck</DialogTitle>
                </DialogHeader>
                <div className="w-full h-[70vh]">
                  <iframe 
                    src={previewPdf(formData.pitchDeck)} 
                    className="w-full h-full" 
                    title="Pitch Deck Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-800 flex items-center text-sm"
              onClick={() => handleRemoveFile("pitchDeck")}
            >
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        )}
      </form>
    </FormLayout>
  );
};

export default CompanyRegistrationForm;
