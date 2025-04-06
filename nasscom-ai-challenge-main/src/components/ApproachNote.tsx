
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/FileUpload";
import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApproachNoteProps {
  selectedFields: string[];
  fieldPdfUploads: Record<string, File | null>;
  onFieldToggle: (field: string) => void;
  onUploadChange: (field: string, file: File | null) => void;
}

const APPROACH_FIELDS = [
  "Health: Medical Imagining diagnostics for TB, COPD etc.",
  "Health: Clinical Decision support for high-risk pregnancies",
  "Industries: AI chatbot for MSME scheme awareness",
  "Education: Creating draw-and-learn platforms for school students in Telangana",
  "Transport: Route optimization for TGSRTC buses.",
  "Finance/Revenue: AI-based audit of registration documents in revenue & stamps dept. for fraud detection."
];

export const ApproachNote: React.FC<ApproachNoteProps> = ({
  selectedFields,
  fieldPdfUploads,
  onFieldToggle,
  onUploadChange
}) => {
  const previewPdf = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Approach Note Submission</h3>
      
      <div className="space-y-4">
        <Label className="text-base">Select your use case in which you want to upload your solution:</Label>
        <div className="grid grid-cols-1 gap-3">
          {APPROACH_FIELDS.map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox 
                id={`field-${field}`} 
                checked={selectedFields.includes(field)}
                onCheckedChange={() => onFieldToggle(field)}
              />
              <Label 
                htmlFor={`field-${field}`}
                className="cursor-pointer"
              >
                {field}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {selectedFields.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base">Upload solution PDFs for selected fields:</Label>
          <div className="space-y-4">
            {selectedFields.map((field) => (
              <div key={field} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">{field}</Label>
                  <div className="flex space-x-2">
                    {fieldPdfUploads[field] && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                            >
                              <FileText className="h-4 w-4 mr-1" /> Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{field}</DialogTitle>
                            </DialogHeader>
                            <div className="w-full h-[70vh]">
                              <iframe 
                                src={previewPdf(fieldPdfUploads[field]!)} 
                                className="w-full h-full" 
                                title={`PDF Preview for ${field}`}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-800 flex items-center text-sm"
                          onClick={() => onUploadChange(field, null)}
                        >
                          <X className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <FileUpload
                  id={`pdf-${field}`}
                  label={`Upload PDF for ${field}`}
                  onChange={(file) => onUploadChange(field, file)}
                  value={fieldPdfUploads[field]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
