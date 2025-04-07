import React from "react";
import { FileUpload } from "@/components/FileUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CompanyBusinessInfoProps {
  formData: FormData;
  onValueChange: (name: string, value: any) => void;
}

export const CompanyBusinessInfo: React.FC<CompanyBusinessInfoProps> = ({
  formData,
  onValueChange,
}) => {
  const businessStages = [
    "No Revenue",
    "$0 - $50k",
    "$50k - $300k",
    "$300k - $1M",
    "$1M and above",
  ];
  

  const industryOptions = [
    "Automotive",
    "Aerospace & Defense",
    "Agriculture & Farming",
    "Banking & Financial Services",
    "Biotechnology",
    "Chemicals",
    "Construction & Real Estate",
    "Consumer Goods & Retail",
    "Education & Training",
    "Electrical & Electronics",
    "Energy & Utilities",
    "Entertainment & Media",
    "Environmental & Sustainability",
    "Food & Beverage",
    "Government & Public Administration",
    "Healthcare & Pharmaceuticals",
    "Hospitality & Tourism",
    "Information Technology & Software",
    "Insurance",
    "Legal & Law Enforcement",
    "Logistics & Transportation",
    "Manufacturing",
    "Mining & Metals",
    "Non-Profit & Social Services",
    "Oil & Gas",
    "Professional Services (Consulting, HR, etc.)",
    "Real Estate & Property Management",
    "Retail & E-commerce",
    "Robotics & Automation",
    "Sports & Recreation",
    "Supply Chain & Warehousing",
    "Telecommunications",
    "Textile & Apparel",
    "Waste Management & Recycling",
    "Others"
  ];

  const employeeCountOptions = [
    "1-10",
    "11-50",
    "51-100",
    "101-500",
    "501+",
  ];
  
  const handleIndustryToggle = (industry: string) => {
    const updatedIndustries = formData.industries.includes(industry)
      ? formData.industries.filter(i => i !== industry)
      : [...formData.industries, industry];
    
    onValueChange("industries", updatedIndustries);
  };

  const previewPdf = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  const handleRemoveFile = (fieldName: string) => {
    onValueChange(fieldName, null);
  };

  return (
    <div className="space-y-6 py-4 border-t border-gray-200">
      <h3 className="text-lg font-medium">Business Information</h3>
      
      <div className="form-group">
        <Label htmlFor="businessStage">Business Stage (based on FY 2024-25 revenue) *</Label>
        <Select 
          value={formData.businessStage} 
          onValueChange={(value) => onValueChange("businessStage", value)}
        >
          <SelectTrigger id="businessStage">
            <SelectValue placeholder="Select business stage" />
          </SelectTrigger>
          <SelectContent>
            {businessStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="form-group">
        <Label>Industry Categories *</Label>
        <div className="max-h-60 overflow-y-auto border rounded-md p-3 mt-2">
          {industryOptions.map((industry) => (
            <div key={industry} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`industry-${industry}`}
                checked={formData.industries.includes(industry)}
                onCheckedChange={() => handleIndustryToggle(industry)}
              />
              <Label htmlFor={`industry-${industry}`} className="cursor-pointer">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {formData.industries.includes("Others") && (
        <div className="form-group">
          <Label htmlFor="otherIndustry">Please specify other industry *</Label>
          <Input
            id="otherIndustry"
            name="otherIndustry"
            value={formData.otherIndustry}
            onChange={(e) => onValueChange("otherIndustry", e.target.value)}
            placeholder="Enter other industry"
          />
        </div>
      )}

      <div className="form-group">
        <Label htmlFor="city">City of Operation *</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => onValueChange("city", e.target.value)}
          placeholder="Enter city"
        />
      </div>

      <div className="form-group">
        <Label htmlFor="femaleFounders">Does your startup have female founder/s?</Label>
        <Select 
          value={formData.femaleFounders} 
          onValueChange={(value) => onValueChange("femaleFounders", value)}
        >
          <SelectTrigger id="femaleFounders">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="form-group">
        <Label htmlFor="employees">Number of Employees *</Label>
        <Select 
          value={formData.employees} 
          onValueChange={(value) => onValueChange("employees", value)}
        >
          <SelectTrigger id="employees">
            <SelectValue placeholder="Select number of employees" />
          </SelectTrigger>
          <SelectContent>
            {employeeCountOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
