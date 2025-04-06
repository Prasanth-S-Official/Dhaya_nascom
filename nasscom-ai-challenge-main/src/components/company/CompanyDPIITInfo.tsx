
import React from "react";
import { FormData } from "@/context/FormContext";

interface CompanyDPIITInfoProps {
  formData: FormData;
  onValueChange: (name: string, value: any) => void;
}

export const CompanyDPIITInfo: React.FC<CompanyDPIITInfoProps> = ({
  formData,
  onValueChange
}) => {
  // This component is now empty as the fields have been moved to CompanyBasicInfo
  return null;
};
