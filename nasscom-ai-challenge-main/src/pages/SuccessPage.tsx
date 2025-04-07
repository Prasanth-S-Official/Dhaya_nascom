
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useForm as useFormContext } from "@/context/FormContext";
import { useToast } from "@/components/ui/use-toast";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { resetForm, formSubmitted } = useFormContext();
  const { toast } = useToast();

  // Redirect if the form hasn't been submitted
  useEffect(() => {
    if (!formSubmitted) {
      toast({
        title: "Form not submitted",
        description: "Please complete the form before accessing this page.",
        variant: "destructive"
      });
      navigate("/form/page1");
    }
  }, [formSubmitted, navigate, toast]);


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="form-card text-center">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Submission Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for registering your startup. Your application has been submitted successfully.
        </p>       
        <div className="mt-4">
          <a href="/" className="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
