
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm as useFormContext } from "@/context/FormContext";
// import { FormLayout } from "@/components/FormLayout";
// import { useToast } from "@/components/ui/use-toast";
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card";
// import { format } from "date-fns";
// import { FileText, Check, AlertCircle } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const ReviewPage = () => {
//   const { formData, submitForm, saveCurrentData } = useFormContext();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleBack = () => {
//     navigate("/form/page3");
//   };

//   const handleSubmit = async () => {
//     await submitForm();
//     navigate("/form/success");
//   };

//   const handleSave = async () => {
//     await saveCurrentData();
//     toast({
//       title: "Progress saved",
//       description: "Your form progress has been saved.",
//     });
//   };

//   const previewPdf = (file: File) => {
//     const fileUrl = URL.createObjectURL(file);
//     return fileUrl;
//   };

//   return (
//     <FormLayout
//       onSave={handleSave}
//       onNext={handleSubmit}
//       onBack={handleBack}
//       currentStep={4}
//       totalSteps={4}
//       isLastStep={true}
//     >
//       <div className="space-y-8">
//         <h2 className="text-2xl font-bold text-center mb-6">Review Your Submission</h2>

//         {/* Basic Info Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="bg-blue-100 p-2 rounded-full mr-2">
//                 <Check className="h-5 w-5 text-blue-600" />
//               </div>
//               Basic Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Name (Single point of contact)</h4>
//               <p>{formData.contactName || "Not provided"}</p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Official Email Id</h4>
//               <p>{formData.email || "Not provided"}</p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Mobile Number</h4>
//               <p>{formData.mobile || "Not provided"}</p>
//             </div>
//             {/* <div>
//               <h4 className="text-sm font-medium text-gray-500">Startup / Company name</h4>
//               <p>{formData.startupName || "Not provided"}</p>
//             </div> */}
//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Name of your Organization</h4>
//               <p>{formData.organizationName || "Not provided"}</p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Organization Website / URL</h4>
//               <p>{formData.website || "Not provided"}</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Company Details Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="bg-blue-100 p-2 rounded-full mr-2">
//                 <Check className="h-5 w-5 text-blue-600" />
//               </div>
//               Company Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Is your company a legally registered entity in India?</h4>
//                 <p>{formData.isRegisteredInIndia || "Not selected"}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Is your company DPIIT certified?</h4>
//                 <p>{formData.isDpiitCertified || "Not selected"}</p>
//               </div>
//               {formData.isDpiitCertified === "Yes" && (
//                 <>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">DPIIT Number</h4>
//                     <p>{formData.dpiitNumber || "Not provided"}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">DPIIT Certificate</h4>
//                     {formData.dpiitCertificate ? (
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline" size="sm" className="text-blue-600">
//                             <FileText className="h-4 w-4 mr-1" /> View Certificate
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-4xl max-h-[80vh]">
//                           <DialogHeader>
//                             <DialogTitle>DPIIT Certificate</DialogTitle>
//                           </DialogHeader>
//                           <iframe 
//                             src={previewPdf(formData.dpiitCertificate)} 
//                             className="w-full h-[70vh]" 
//                             title="DPIIT Certificate"
//                           />
//                         </DialogContent>
//                       </Dialog>
//                     ) : (
//                       <p className="text-red-500">Not uploaded</p>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Incorporation Date</h4>
//                 <p>{formData.incorporationDate ? format(formData.incorporationDate, "PPP") : "Not provided"}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Incorporation Certificate</h4>
//                 {formData.incorporationCertificate ? (
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button variant="outline" size="sm" className="text-blue-600">
//                         <FileText className="h-4 w-4 mr-1" /> View Certificate
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-4xl max-h-[80vh]">
//                       <DialogHeader>
//                         <DialogTitle>Incorporation Certificate</DialogTitle>
//                       </DialogHeader>
//                       <iframe 
//                         src={previewPdf(formData.incorporationCertificate)} 
//                         className="w-full h-[70vh]" 
//                         title="Incorporation Certificate"
//                       />
//                     </DialogContent>
//                   </Dialog>
//                 ) : (
//                   <p>Not uploaded</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Current Stage of Business</h4>
//                 <p>{formData.businessStage || "Not selected"}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">City</h4>
//                 <p>{formData.city || "Not provided"}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Number of Female founders</h4>
//                 <p>{formData.femaleFounders || "Not provided"}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Number of employees</h4>
//                 <p>{formData.employees || "Not selected"}</p>
//               </div>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Industries You cater to</h4>
//               {formData.industries.length > 0 ? (
//                 <div className="flex flex-wrap gap-2 mt-1">
//                   {formData.industries.map(industry => (
//                     <span key={industry} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                       {industry}
//                     </span>
//                   ))}
//                   {formData.industries.includes("Others") && formData.otherIndustry && (
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                       Others: {formData.otherIndustry}
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <p>None selected</p>
//               )}
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Motivation to participate</h4>
//               <p className="whitespace-pre-wrap">{formData.motivation || "Not provided"}</p>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-500">Pitch Deck</h4>
//               {formData.pitchDeck ? (
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" size="sm" className="text-blue-600">
//                       <FileText className="h-4 w-4 mr-1" /> View Pitch Deck
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-4xl max-h-[80vh]">
//                     <DialogHeader>
//                       <DialogTitle>Pitch Deck</DialogTitle>
//                     </DialogHeader>
//                     <iframe 
//                       src={previewPdf(formData.pitchDeck)} 
//                       className="w-full h-[70vh]" 
//                       title="Pitch Deck"
//                     />
//                   </DialogContent>
//                 </Dialog>
//               ) : (
//                 <p>Not uploaded</p>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Approach Note Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="bg-blue-100 p-2 rounded-full mr-2">
//                 <Check className="h-5 w-5 text-blue-600" />
//               </div>
//               Approach Note
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <h4 className="text-sm font-medium text-gray-500 mb-2">Selected Fields</h4>
//             {formData.selectedFields.length > 0 ? (
//               <div className="space-y-4">
//                 {formData.selectedFields.map(field => (
//                   <div key={field} className="border border-gray-200 rounded-md p-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-medium">{field}</h3>
//                       {formData.fieldPdfUploads[field] ? (
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="outline" size="sm" className="text-blue-600">
//                               <FileText className="h-4 w-4 mr-1" /> View PDF
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-4xl max-h-[80vh]">
//                             <DialogHeader>
//                               <DialogTitle>{field}</DialogTitle>
//                             </DialogHeader>
//                             <iframe 
//                               src={previewPdf(formData.fieldPdfUploads[field]!)} 
//                               className="w-full h-[70vh]" 
//                               title={`PDF for ${field}`}
//                             />
//                           </DialogContent>
//                         </Dialog>
//                       ) : (
//                         <div className="flex items-center text-red-600">
//                           <AlertCircle className="h-4 w-4 mr-1" /> PDF Missing
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No fields selected</p>
//             )}
//           </CardContent>
//         </Card>

//         <div className="text-center">
//           <p className="text-gray-500 text-sm">
//             Please verify all the information above before submitting. Once submitted, you won't be able to make changes.
//           </p>
//         </div>
//       </div>
//     </FormLayout>
//   );
// };

// export default ReviewPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm as useFormContext } from "@/context/FormContext";
import { FormLayout } from "@/components/FormLayout";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { format } from "date-fns";
import { FileText, Check, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReviewPage = () => {
  const { formData, submitForm, saveCurrentData } = useFormContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showReminderDialog, setShowReminderDialog] = useState(true);

  const handleBack = () => {
    navigate("/form/page3");
  };

  const handleSubmit = async () => {
    await submitForm();
    navigate("/form/success");
  };

  const handleSave = async () => {
    await saveCurrentData();
    toast({
      title: "Progress saved",
      description: "Your form progress has been saved.",
    });
  };

  const previewPdf = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  return (
    <FormLayout
      onSave={handleSave}
      onNext={handleSubmit}
      onBack={handleBack}
      currentStep={4}
      totalSteps={4}
      isLastStep={true}
    >
      {/* 🔔 Reminder Dialog on first load */}
  <Dialog open={showReminderDialog} onOpenChange={() => {}} modal>
  <DialogContent
    className="max-w-md text-center rounded-lg bg-white shadow-xl p-6"
    onInteractOutside={(e) => e.preventDefault()}
    onEscapeKeyDown={(e) => e.preventDefault()}
    hideClose
  >
    <style jsx>{`
      .dialog-overlay {
        backdrop-filter: blur(6px);
        background-color: rgba(0, 0, 0, 0.3);
      }
    `}</style>

    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-gray-800 mb-2">
        Final Reminder
      </DialogTitle>
    </DialogHeader>
    <p className="text-sm text-gray-600 leading-relaxed">
      Once you have completed the application, please verify it and make sure to click <strong>“Submit”</strong>.
      <br /><br />
      Applications will only be considered if submitted before <strong>00:00 hrs on 01.05.2025</strong>.
      No changes can be made after this deadline.
    </p>
    <div className="mt-6">
      <Button
        onClick={() => setShowReminderDialog(false)}
        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
      >
        OK
      </Button>
    </div>
  </DialogContent>
</Dialog>


      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center mb-6">Review Your Submission</h2>

        {/* Basic Info Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Check className="h-5 w-5 text-blue-600" />
              </div>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name (Single point of contact)</h4>
              <p>{formData.contactName || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Official Email Id</h4>
              <p>{formData.email || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Mobile Number</h4>
              <p>{formData.mobile || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name of your Organization</h4>
              <p>{formData.organizationName || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Organization Website / URL</h4>
              <p>{formData.website || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Company Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Check className="h-5 w-5 text-blue-600" />
              </div>
              Company Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Incorporation Date</h4>
                <p>{formData.incorporationDate ? format(formData.incorporationDate, "PPP") : "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Incorporation Certificate</h4>
                {formData.incorporationCertificate ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-blue-600">
                        <FileText className="h-4 w-4 mr-1" /> View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Incorporation Certificate</DialogTitle>
                      </DialogHeader>
                      <iframe 
                        src={previewPdf(formData.incorporationCertificate)} 
                        className="w-full h-[70vh]" 
                        title="Incorporation Certificate"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p>Not uploaded</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">DPIIT Number</h4>
                <p>{formData.dpiitNumber || "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">DPIIT Certificate</h4>
                {formData.dpiitCertificate ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-blue-600">
                        <FileText className="h-4 w-4 mr-1" /> View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>DPIIT Certificate</DialogTitle>
                      </DialogHeader>
                      <iframe 
                        src={previewPdf(formData.dpiitCertificate)} 
                        className="w-full h-[70vh]" 
                        title="DPIIT Certificate"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p className="text-red-500">Not uploaded</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Current Stage of Business</h4>
                <p>{formData.businessStage || "Not selected"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">City</h4>
                <p>{formData.city || "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Number of Female founders</h4>
                <p>{formData.femaleFounders || "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Number of employees</h4>
                <p>{formData.employees || "Not selected"}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Industries You cater to</h4>
              {formData.industries.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.industries.map(industry => (
                    <span key={industry} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {industry}
                    </span>
                  ))}
                  {formData.industries.includes("Others") && formData.otherIndustry && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Others: {formData.otherIndustry}
                    </span>
                  )}
                </div>
              ) : (
                <p>None selected</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Motivation to participate</h4>
              <p className="whitespace-pre-wrap">{formData.motivation || "Not provided"}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Pitch Deck</h4>
              {formData.pitchDeck ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-blue-600">
                      <FileText className="h-4 w-4 mr-1" /> View Pitch Deck
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Pitch Deck</DialogTitle>
                    </DialogHeader>
                    <iframe 
                      src={previewPdf(formData.pitchDeck)} 
                      className="w-full h-[70vh]" 
                      title="Pitch Deck"
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <p>Not uploaded</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Approach Note Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Check className="h-5 w-5 text-blue-600" />
              </div>
              Approach Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Selected Fields</h4>
            {formData.selectedFields.length > 0 ? (
              <div className="space-y-4">
                {formData.selectedFields.map(field => (
                  <div key={field} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{field}</h3>
                      {formData.fieldPdfUploads[field] ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-blue-600">
                              <FileText className="h-4 w-4 mr-1" /> View PDF
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{field}</DialogTitle>
                            </DialogHeader>
                            <iframe 
                              src={previewPdf(formData.fieldPdfUploads[field]!)} 
                              className="w-full h-[70vh]" 
                              title={`PDF for ${field}`}
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" /> PDF Missing
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No fields selected</p>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Please verify all the information above before submitting. Once submitted, you won't be able to make changes.
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default ReviewPage;
