// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { FormData } from "@/context/FormContext";
// import { FileUpload } from "@/components/FileUpload";

// interface CompanyBasicInfoProps {
//   formData: FormData;
//   onValueChange: (name: string, value: any) => void;
// }

// export const CompanyBasicInfo: React.FC<CompanyBasicInfoProps> = ({
//   formData,
//   onValueChange
// }) => {
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
  
//   const [selectedYear, setSelectedYear] = useState<number | null>(
//     formData.incorporationDate ? formData.incorporationDate.getFullYear() : null
//   );
//   const [selectedMonth, setSelectedMonth] = useState<number | null>(
//     formData.incorporationDate ? formData.incorporationDate.getMonth() : null
//   );
  
//   const handleYearChange = (year: string) => {
//     const numYear = parseInt(year);
//     setSelectedYear(numYear);
    
//     if (selectedMonth !== null) {
//       const newDate = new Date(numYear, selectedMonth, 1);
//       onValueChange("incorporationDate", newDate);
//     }
//   };
  
//   const handleMonthChange = (month: string) => {
//     const monthIndex = months.indexOf(month);
//     setSelectedMonth(monthIndex);
    
//     if (selectedYear !== null) {
//       const newDate = new Date(selectedYear, monthIndex, 1);
//       onValueChange("incorporationDate", newDate);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="form-group">
//         <Label htmlFor="isRegisteredInIndia">Is your company a legally registered entity in India? *</Label>
//         <Select
//           value={formData.isRegisteredInIndia}
//           onValueChange={(value) => onValueChange("isRegisteredInIndia", value)}
//         >
//           <SelectTrigger id="isRegisteredInIndia">
//             <SelectValue placeholder="Select an option" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Yes">Yes</SelectItem>
//             <SelectItem value="No">No</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {formData.isRegisteredInIndia === "Yes" && (
//         <div className="form-group pl-4 border-l-2 border-gray-200">
//           <div className="form-group">
//             <Label htmlFor="incorporationDate">Please enter the incorporation date for your organization:</Label>
//             <div className="flex flex-col space-y-2">
//               <div className="flex gap-2">
//                 <div className="w-1/2">
//                   <Select
//                     value={selectedYear?.toString() || ""}
//                     onValueChange={handleYearChange}
//                   >
//                     <SelectTrigger id="incorporationYear">
//                       <SelectValue placeholder="Select Year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {years.map((year) => (
//                         <SelectItem key={year} value={year.toString()}>
//                           {year}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="w-1/2">
//                   <Select
//                     value={selectedMonth !== null ? months[selectedMonth] : ""}
//                     onValueChange={handleMonthChange}
//                   >
//                     <SelectTrigger id="incorporationMonth">
//                       <SelectValue placeholder="Select Month" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {months.map((month) => (
//                         <SelectItem key={month} value={month}>
//                           {month}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !formData.incorporationDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {formData.incorporationDate ? (
//                       format(formData.incorporationDate, "PPP")
//                     ) : (
//                       <span>Select specific day (optional)</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={formData.incorporationDate || undefined}
//                     onSelect={(date) => {
//                       onValueChange("incorporationDate", date);
//                       setCalendarOpen(false);
//                       if (date) {
//                         setSelectedYear(date.getFullYear());
//                         setSelectedMonth(date.getMonth());
//                       }
//                     }}
//                     initialFocus
//                     className="pointer-events-auto"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>
          
//           <FileUpload
//             id="incorporationCertificate"
//             label="Upload Incorporation certificate (PDF format)"
//             onChange={(file) => onValueChange("incorporationCertificate", file)}
//             value={formData.incorporationCertificate}
//           />
          
//           <div className="form-group mt-4">
//             <Label htmlFor="isDpiitCertified">Is your company DPIIT certified? *</Label>
//             <Select
//               value={formData.isDpiitCertified}
//               onValueChange={(value) => onValueChange("isDpiitCertified", value)}
//             >
//               <SelectTrigger id="isDpiitCertified">
//                 <SelectValue placeholder="Select an option" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Yes">Yes</SelectItem>
//                 <SelectItem value="No">No</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {formData.isDpiitCertified === "Yes" && (
//             <div className="mt-4 pl-4 border-l-2 border-gray-200">
//               <div className="form-group">
//                 <Label htmlFor="dpiitNumber">Enter DPIIT No *</Label>
//                 <Input
//                   id="dpiitNumber"
//                   name="dpiitNumber"
//                   value={formData.dpiitNumber}
//                   onChange={(e) => onValueChange("dpiitNumber", e.target.value)}
//                   placeholder="Enter your DPIIT number"
//                   required
//                 />
//               </div>

//               <FileUpload
//                 id="dpiitCertificate"
//                 label="Upload DPIIT Certificate (PDF format) *"
//                 onChange={(file) => onValueChange("dpiitCertificate", file)}
//                 value={formData.dpiitCertificate}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

/////version 1 -above

// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { FormData } from "@/context/FormContext";
// import { FileUpload } from "@/components/FileUpload";
// import { toast } from "sonner";

// interface CompanyBasicInfoProps {
//   formData: FormData;
//   onValueChange: (name: string, value: any) => void;
// }

// export const CompanyBasicInfo: React.FC<CompanyBasicInfoProps> = ({
//   formData,
//   onValueChange,
// }) => {
//   const [calendarOpen, setCalendarOpen] = useState(false);

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const [selectedYear, setSelectedYear] = useState<number | null>(
//     formData.incorporationDate ? formData.incorporationDate.getFullYear() : null
//   );
//   const [selectedMonth, setSelectedMonth] = useState<number | null>(
//     formData.incorporationDate ? formData.incorporationDate.getMonth() : null
//   );

//   const handleYearChange = (year: string) => {
//     const numYear = parseInt(year);
//     setSelectedYear(numYear);
//     if (selectedMonth !== null) {
//       const newDate = new Date(numYear, selectedMonth, 1);
//       onValueChange("incorporationDate", newDate);
//     }
//   };

//   const handleMonthChange = (month: string) => {
//     const monthIndex = months.indexOf(month);
//     setSelectedMonth(monthIndex);
//     if (selectedYear !== null) {
//       const newDate = new Date(selectedYear, monthIndex, 1);
//       onValueChange("incorporationDate", newDate);
//     }
//   };

//   const handleFileChange = (
//     file: File | null,
//     field: keyof FormData
//   ) => {
//     if (file) {
//       const isPdf = file.type === "application/pdf";
//       const isTooBig = file.size > 5 * 1024 * 1024;

//       if (!isPdf || isTooBig) {
//         toast("Invalid file", {
//           description: !isPdf
//             ? "Only PDF files are allowed."
//             : "File size must be less than 5MB.",
//           variant: "destructive",
//         });
//         return;
//       }

//       onValueChange(field, file);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="form-group">
//         <Label htmlFor="isRegisteredInIndia">
//           Is your company a legally registered entity in India? *
//         </Label>
//         <Select
//           value={formData.isRegisteredInIndia}
//           onValueChange={(value) => onValueChange("isRegisteredInIndia", value)}
//         >
//           <SelectTrigger id="isRegisteredInIndia">
//             <SelectValue placeholder="Select an option" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Yes">Yes</SelectItem>
//             <SelectItem value="No">No</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {formData.isRegisteredInIndia === "Yes" && (
//         <div className="form-group pl-4 border-l-2 border-gray-200">
//           <div className="form-group">
//             <Label htmlFor="incorporationDate">
//               Please enter the incorporation date for your organization:
//             </Label>
//             <div className="flex flex-col space-y-2">
//               <div className="flex gap-2">
//                 <div className="w-1/2">
//                   <Select
//                     value={selectedYear?.toString() || ""}
//                     onValueChange={handleYearChange}
//                   >
//                     <SelectTrigger id="incorporationYear">
//                       <SelectValue placeholder="Select Year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {years.map((year) => (
//                         <SelectItem key={year} value={year.toString()}>
//                           {year}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="w-1/2">
//                   <Select
//                     value={selectedMonth !== null ? months[selectedMonth] : ""}
//                     onValueChange={handleMonthChange}
//                   >
//                     <SelectTrigger id="incorporationMonth">
//                       <SelectValue placeholder="Select Month" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {months.map((month) => (
//                         <SelectItem key={month} value={month}>
//                           {month}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !formData.incorporationDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {formData.incorporationDate ? (
//                       format(formData.incorporationDate, "PPP")
//                     ) : (
//                       <span>Select specific day (optional)</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={formData.incorporationDate || undefined}
//                     onSelect={(date) => {
//                       onValueChange("incorporationDate", date);
//                       setCalendarOpen(false);
//                       if (date) {
//                         setSelectedYear(date.getFullYear());
//                         setSelectedMonth(date.getMonth());
//                       }
//                     }}
//                     initialFocus
//                     className="pointer-events-auto"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <FileUpload
//             id="incorporationCertificate"
//             label="Upload Incorporation certificate"
//             onChange={(file) => handleFileChange(file, "incorporationCertificate")}
//             value={formData.incorporationCertificate}
//             helperText="PDF only, max 5MB"
//           />

//           <div className="form-group mt-4">
//             <Label htmlFor="isDpiitCertified">
//               Is your company DPIIT certified? *
//             </Label>
//             <Select
//               value={formData.isDpiitCertified}
//               onValueChange={(value) => onValueChange("isDpiitCertified", value)}
//             >
//               <SelectTrigger id="isDpiitCertified">
//                 <SelectValue placeholder="Select an option" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Yes">Yes</SelectItem>
//                 <SelectItem value="No">No</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {formData.isDpiitCertified === "Yes" && (
//             <div className="mt-4 pl-4 border-l-2 border-gray-200">
//               <div className="form-group">
//                 <Label htmlFor="dpiitNumber">Enter DPIIT No *</Label>
//                 <Input
//                   id="dpiitNumber"
//                   name="dpiitNumber"
//                   value={formData.dpiitNumber}
//                   onChange={(e) =>
//                     onValueChange("dpiitNumber", e.target.value)
//                   }
//                   placeholder="Enter your DPIIT number"
//                   required
//                 />
//               </div>

//               <FileUpload
//                 id="dpiitCertificate"
//                 label="Upload DPIIT Certificate"
//                 onChange={(file) => handleFileChange(file, "dpiitCertificate")}
//                 value={formData.dpiitCertificate}
//                 helperText="PDF only, max 5MB"
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

//below correct

// import React, { useState, useImperativeHandle, forwardRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { FormData } from "@/context/FormContext";
// import { FileUpload } from "@/components/FileUpload";
// import { toast } from "sonner";

// interface CompanyBasicInfoProps {
//   formData: FormData;
//   onValueChange: (name: string, value: any) => void;
// }

// export const CompanyBasicInfo = forwardRef(
//   ({ formData, onValueChange }: CompanyBasicInfoProps, ref) => {
//     const [calendarOpen, setCalendarOpen] = useState(false);

//     const currentYear = new Date().getFullYear();
//     const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];

//     const [selectedYear, setSelectedYear] = useState<number | null>(
//       formData.incorporationDate ? formData.incorporationDate.getFullYear() : null
//     );
//     const [selectedMonth, setSelectedMonth] = useState<number | null>(
//       formData.incorporationDate ? formData.incorporationDate.getMonth() : null
//     );

//     const handleYearChange = (year: string) => {
//       const numYear = parseInt(year);
//       setSelectedYear(numYear);
//       if (selectedMonth !== null) {
//         const newDate = new Date(numYear, selectedMonth, 1);
//         onValueChange("incorporationDate", newDate);
//       }
//     };

//     const handleMonthChange = (month: string) => {
//       const monthIndex = months.indexOf(month);
//       setSelectedMonth(monthIndex);
//       if (selectedYear !== null) {
//         const newDate = new Date(selectedYear, monthIndex, 1);
//         onValueChange("incorporationDate", newDate);
//       }
//     };

//     const handleFileChange = (
//       file: File | null,
//       field: keyof FormData
//     ) => {
//       if (file) {
//         const isPdf = file.type === "application/pdf";
//         const isTooBig = file.size > 5 * 1024 * 1024;

//         if (!isPdf || isTooBig) {
//           toast("Invalid file", {
//             description: !isPdf
//               ? "Only PDF files are allowed."
//               : "File size must be less than 5MB.",
//             variant: "destructive",
//           });
//           return;
//         }

//         onValueChange(field, file);
//       }
//     };

//     // ✅ Validation logic exposed via ref
//     useImperativeHandle(ref, () => ({
//       validateSection: () => {
//         const errors: string[] = [];

//         if (formData.isRegisteredInIndia === "Yes") {
//           if (selectedYear === null) {
//             errors.push("Year is required");
//           }
//           if (selectedMonth === null) {
//             errors.push("Month is required");
//           }
//           if (!formData.incorporationCertificate) {
//             errors.push("Incorporation Certificate is required");
//           }

//           if (formData.isDpiitCertified === "Yes") {
//             if (!formData.dpiitNumber?.trim()) {
//               errors.push("DPIIT Number is required");
//             }
//             if (!formData.dpiitCertificate) {
//               errors.push("DPIIT Certificate is required");
//             }
//           }
//         }

//         if (errors.length > 0) {
//           toast("Missing required fields", {
//             description: errors.join(", "),
//             variant: "destructive",
//           });
//           return false;
//         }

//         return true;
//       },
//     }));

//     return (
//       <div className="space-y-6">
//         <div className="form-group">
//           <Label htmlFor="isRegisteredInIndia">
//             Is your company a legally registered entity in India? *
//           </Label>
//           <Select
//             value={formData.isRegisteredInIndia}
//             onValueChange={(value) => onValueChange("isRegisteredInIndia", value)}
//           >
//             <SelectTrigger id="isRegisteredInIndia">
//               <SelectValue placeholder="Select an option" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Yes">Yes</SelectItem>
//               <SelectItem value="No">No</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {formData.isRegisteredInIndia === "Yes" && (
//           <div className="form-group pl-4 border-l-2 border-gray-200">
//             <div className="form-group">
//               <Label htmlFor="incorporationDate">
//                 Please enter the incorporation date for your organization:
//               </Label>
//               <div className="flex flex-col space-y-2">
//                 <div className="flex gap-2">
//                   <div className="w-1/2">
//                     <Label>Year *</Label>
//                     <Select
//                       value={selectedYear?.toString() || ""}
//                       onValueChange={handleYearChange}
//                     >
//                       <SelectTrigger id="incorporationYear">
//                         <SelectValue placeholder="Select Year" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {years.map((year) => (
//                           <SelectItem key={year} value={year.toString()}>
//                             {year}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="w-1/2">
//                     <Label>Month *</Label>
//                     <Select
//                       value={selectedMonth !== null ? months[selectedMonth] : ""}
//                       onValueChange={handleMonthChange}
//                     >
//                       <SelectTrigger id="incorporationMonth">
//                         <SelectValue placeholder="Select Month" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {months.map((month) => (
//                           <SelectItem key={month} value={month}>
//                             {month}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !formData.incorporationDate && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {formData.incorporationDate ? (
//                         format(formData.incorporationDate, "PPP")
//                       ) : (
//                         <span>Select specific day (optional)</span>
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={formData.incorporationDate || undefined}
//                       onSelect={(date) => {
//                         onValueChange("incorporationDate", date);
//                         setCalendarOpen(false);
//                         if (date) {
//                           setSelectedYear(date.getFullYear());
//                           setSelectedMonth(date.getMonth());
//                         }
//                       }}
//                       initialFocus
//                       className="pointer-events-auto"
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>

//             <FileUpload
//               id="incorporationCertificate"
//               label="Upload Incorporation Certificate *"
//               onChange={(file) => handleFileChange(file, "incorporationCertificate")}
//               value={formData.incorporationCertificate}
//               helperText="PDF only, max 5MB"
//             />

//             <div className="form-group mt-4">
//               <Label htmlFor="isDpiitCertified">
//                 Is your company DPIIT certified? *
//               </Label>
//               <Select
//                 value={formData.isDpiitCertified}
//                 onValueChange={(value) => onValueChange("isDpiitCertified", value)}
//               >
//                 <SelectTrigger id="isDpiitCertified">
//                   <SelectValue placeholder="Select an option" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Yes">Yes</SelectItem>
//                   <SelectItem value="No">No</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {formData.isDpiitCertified === "Yes" && (
//               <div className="mt-4 pl-4 border-l-2 border-gray-200">
//                 <div className="form-group">
//                   <Label htmlFor="dpiitNumber">Enter DPIIT No *</Label>
//                   <Input
//                     id="dpiitNumber"
//                     name="dpiitNumber"
//                     value={formData.dpiitNumber}
//                     onChange={(e) =>
//                       onValueChange("dpiitNumber", e.target.value)
//                     }
//                     placeholder="Enter your DPIIT number"
//                     required
//                   />
//                 </div>

//                 <FileUpload
//                   id="dpiitCertificate"
//                   label="Upload DPIIT Certificate *"
//                   onChange={(file) => handleFileChange(file, "dpiitCertificate")}
//                   value={formData.dpiitCertificate}
//                   helperText="PDF only, max 5MB"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// CompanyBasicInfo.displayName = "CompanyBasicInfo";

//version night


import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FormData } from "@/context/FormContext";
import { FileUpload } from "@/components/FileUpload";
import { toast } from "sonner";

interface CompanyBasicInfoProps {
  formData: FormData;
  onValueChange: (name: string, value: any) => void;
}

export const CompanyBasicInfo = forwardRef(
  ({ formData, onValueChange }: CompanyBasicInfoProps, ref) => {
    const [calendarOpen, setCalendarOpen] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const [selectedYear, setSelectedYear] = useState<number | null>(
      formData.incorporationDate ? formData.incorporationDate.getFullYear() : null
    );
    const [selectedMonth, setSelectedMonth] = useState<number | null>(
      formData.incorporationDate ? formData.incorporationDate.getMonth() : null
    );

    const handleYearChange = (year: string) => {
      const numYear = parseInt(year);
      setSelectedYear(numYear);
      if (selectedMonth !== null) {
        const newDate = new Date(numYear, selectedMonth, 1);
        onValueChange("incorporationDate", newDate);
      }
    };

    const handleMonthChange = (month: string) => {
      const monthIndex = months.indexOf(month);
      setSelectedMonth(monthIndex);
      if (selectedYear !== null) {
        const newDate = new Date(selectedYear, monthIndex, 1);
        onValueChange("incorporationDate", newDate);
      }
    };

    const handleFileChange = (
      file: File | null,
      field: keyof FormData
    ) => {
      if (file) {
        const isPdf = file.type === "application/pdf";
        const isTooBig = file.size > 5 * 1024 * 1024;

        if (!isPdf || isTooBig) {
          toast("Invalid file", {
            description: !isPdf
              ? "Only PDF files are allowed."
              : "File size must be less than 5MB.",
            variant: "destructive",
          });
          return;
        }

        onValueChange(field, file);
      }
    };

    // ✅ Validation logic exposed via ref
    useImperativeHandle(ref, () => ({
      validateSection: () => {
        const errors: string[] = [];

        if (selectedYear === null) {
          errors.push("Year is required");
        }
        if (selectedMonth === null) {
          errors.push("Month is required");
        }
        if (!formData.incorporationCertificate) {
          errors.push("Incorporation Certificate is required");
        }
        if (!formData.dpiitNumber?.trim()) {
          errors.push("DPIIT Number is required");
        }
        if (!formData.dpiitCertificate) {
          errors.push("DPIIT Certificate is required");
        }

        if (errors.length > 0) {
          toast("Missing required fields", {
            description: errors.join(", "),
            variant: "destructive",
          });
          return false;
        }

        return true;
      },
    }));

    return (
      <div className="space-y-6">
        <div className="form-group pl-4 border-l-2 border-gray-200">
          <div className="form-group">
            <Label htmlFor="incorporationDate">
              Please enter the incorporation date for your organization:
            </Label>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Label>Year *</Label>
                  <Select
                    value={selectedYear?.toString() || ""}
                    onValueChange={handleYearChange}
                  >
                    <SelectTrigger id="incorporationYear">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2">
                  <Label>Month *</Label>
                  <Select
                    value={selectedMonth !== null ? months[selectedMonth] : ""}
                    onValueChange={handleMonthChange}
                  >
                    <SelectTrigger id="incorporationMonth">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.incorporationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.incorporationDate ? (
                      format(formData.incorporationDate, "PPP")
                    ) : (
                      <span>Select specific day (optional)</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.incorporationDate || undefined}
                    onSelect={(date) => {
                      onValueChange("incorporationDate", date);
                      setCalendarOpen(false);
                      if (date) {
                        setSelectedYear(date.getFullYear());
                        setSelectedMonth(date.getMonth());
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <FileUpload
            id="incorporationCertificate"
            label="Upload Incorporation Certificate *"
            onChange={(file) => handleFileChange(file, "incorporationCertificate")}
            value={formData.incorporationCertificate}
            helperText="PDF only, max 5MB"
          />

          <div className="form-group mt-4">
            <Label htmlFor="dpiitNumber">Enter DPIIT No *</Label>
            <Input
              id="dpiitNumber"
              name="dpiitNumber"
              value={formData.dpiitNumber}
              onChange={(e) =>
                onValueChange("dpiitNumber", e.target.value)
              }
              placeholder="Enter your DPIIT number"
              required
            />
          </div>

          <FileUpload
            id="dpiitCertificate"
            label="Upload DPIIT Certificate *"
            onChange={(file) => handleFileChange(file, "dpiitCertificate")}
            value={formData.dpiitCertificate}
            helperText="PDF only, max 5MB"
          />
        </div>
      </div>
    );
  }
);

CompanyBasicInfo.displayName = "CompanyBasicInfo";
