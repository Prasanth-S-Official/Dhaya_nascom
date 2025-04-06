import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/FileUpload";
import { FormData } from "@/context/FormContext";
import { toast } from "sonner";

interface CompanyMotivationProps {
  formData: FormData;
  onValueChange: (name: string, value: any) => void;
}

export const CompanyMotivation: React.FC<CompanyMotivationProps> = ({
  formData,
  onValueChange
}) => {

  const handlePitchDeckUpload = (file: File | null) => {
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isSizeOk = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isPdf) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (!isSizeOk) {
      toast.error("File size should be less than 5MB.");
      return;
    }

    onValueChange("pitchDeck", file);
  };

  return (
    <div className="space-y-6">
      <div className="form-group">
        <Label htmlFor="motivation">
          What is your motivation to participate in the Grand Challenge? (Maximum 100 Words)
        </Label>
        <Textarea
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={(e) => onValueChange("motivation", e.target.value)}
          placeholder="Describe your motivation"
          className="min-h-[120px]"
        />
        <div className="text-xs text-right text-gray-500">
          {formData.motivation ? formData.motivation.trim().split(/\s+/).length : 0} / 100 words
        </div>
      </div>

      <FileUpload
        id="pitchDeck"
        label="Please share your pitch deck (product/company deck)"
        onChange={handlePitchDeckUpload}
        value={formData.pitchDeck}
        helperText="PDF only, max 5MB"
      />
    </div>
  );
};
