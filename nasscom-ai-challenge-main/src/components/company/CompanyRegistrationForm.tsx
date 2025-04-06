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
    const requiredFields = [
      'isRegisteredInIndia', 'businessStage', 
      'industries', 'city', 'employees'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return !value || (Array.isArray(value) && value.length === 0);
    });
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.isDpiitCertified === "Yes" && !formData.dpiitNumber) {
      toast({
        title: "DPIIT information required",
        description: "Please provide your DPIIT number.",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.motivation) {
      const wordCount = formData.motivation.trim().split(/\s+/).length;
      if (wordCount > 100) {
        toast({
          title: "Motivation is too long",
          description: "Please limit your motivation to 100 words or less.",
          variant: "destructive"
        });
        return false;
      }
    }
    
    if (formData.industries.includes("Others") && !formData.otherIndustry) {
      toast({
        title: "Other industry required",
        description: "Please specify the other industry.",
        variant: "destructive"
      });
      return false;
    }
    
    // if (formData.selectedFields.length > 0) {
    //   const missingUploads = formData.selectedFields.filter(
    //     field => !formData.fieldPdfUploads[field]
    //   );
      
    //   if (missingUploads.length > 0) {
    //     toast({
    //       title: "Missing PDF uploads helo",
    //       description: `Please upload PDFs for all selected approach fields: ${missingUploads.join(', ')}`,
    //       variant: "destructive"
    //     });
    //     return false;
    //   }
    // }
    
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
