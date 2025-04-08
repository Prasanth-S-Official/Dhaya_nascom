import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
  id: string;
  helperText?: string;
}

export const FileUpload = ({
  accept = ".pdf",
  label,
  onChange,
  value,
  className,
  id,
  helperText,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (accept.includes(".pdf") && isPdf) {
        onChange(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className={cn("form-group", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={cn(
          "mt-1 flex justify-center px-6 py-4 border-2 border-dashed rounded-md transition-colors",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          value ? "bg-green-50 border-green-300" : ""
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-1 text-center">
          {value ? (
            <div className="text-green-600">
              <p className="text-sm">{value.name}</p>
              <p className="text-xs">File uploaded successfully</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor={id}
                  className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id={id}
                    name={id}
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept={accept}
                  />
                </label>
                <span className="pl-1">or drag and drop</span>
              </div>
            </>
          )}
          {helperText && (
            <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
          )}
        </div>
      </div>
    </div>
  );
};
