import React from "react";
import { Button } from "@/components/ui/button";

interface FormLayoutProps {
  children: React.ReactNode;
  onSave: () => void; // You can remove this too if unused elsewhere
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  isLastStep?: boolean;
}

export function FormLayout({
  children,
  onNext,
  onBack,
  currentStep = 1,
  totalSteps = 4,
  isLastStep = false,
}: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="form-card">
        {/* Logo Section */}
        <div className="flex justify-between items-center mb-6">
          <img
            src="/lovable-uploads/a8158608-07a1-4b19-87ca-75a5c8c97516.png"
            alt="T-AIM Logo"
            className="h-12 w-auto"
          />
          <img
            src="/lovable-uploads/50af34cf-0028-4267-95af-fcdffa3ee943.png"
            alt="NASSCOM Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              Telangana AI GrandChallenge
            </h1>
            <p className="text-base sm:text-xl font-semibold text-pink-600 mt-1">
              Registration
            </p>
          </div>

          {/* Stepper */}
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

        {/* Form Content */}
        {children}

        {/* Navigation Buttons */}
        <div className="form-nav">
          {onBack && (
            <Button variant="outline" onClick={onBack} type="button">
              Back
            </Button>
          )}
          {onNext && (
            <Button onClick={onNext} type="button" className="ml-auto">
              {isLastStep ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
