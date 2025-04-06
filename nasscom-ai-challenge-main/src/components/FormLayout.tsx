
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FormLayoutProps {
  children: React.ReactNode;
  onSave: () => void;
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  isLastStep?: boolean;
}

export function FormLayout({
  children,
  onSave,
  onNext,
  onBack,
  currentStep = 1,
  totalSteps = 4,
  isLastStep = false,
}: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="form-card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <img 
              src="/lovable-uploads/a8158608-07a1-4b19-87ca-75a5c8c97516.png" 
              alt="T-AIM Logo"
              className="h-12 w-auto"
            />
          </div>
          <div>
            <img 
              src="/lovable-uploads/50af34cf-0028-4267-95af-fcdffa3ee943.png" 
              alt="NASSCOM Logo"
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">
            AI Challenge Registration
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="w-full max-w-xs">
              <div className="flex items-center">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        i + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                    {i < totalSteps - 1 && (
                      <div
                        className={`h-1 flex-1 ${
                          i + 1 < currentStep ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-600">
                <div>Basic Info</div>
                <div>Company Details</div>
                <div>Approach Note</div>
                <div>Review</div>
              </div>
            </div>
          </div>
        </div>

        {children}

        <div className="form-nav">
          {onBack && (
            <Button variant="outline" onClick={onBack} type="button">
              Back
            </Button>
          )}
          
          <div className="flex gap-3 ml-auto">
            <Button variant="outline" onClick={onSave} type="button">
              Save
            </Button>

            {onNext && (
              <Button onClick={onNext} type="button">
                {isLastStep ? "Submit" : "Next"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
