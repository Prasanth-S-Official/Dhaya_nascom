
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm as useFormContext } from "@/context/FormContext";
// import { FormLayout } from "@/components/FormLayout";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import { supabase } from "@/lib/supabase"; 


// const FormPage1 = () => {
//   const { formData, updateFormData, saveCurrentData, isSavingData } = useFormContext();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type } = e.target;
    
//     // Handle specific validations
//     if (type === 'number') {
//       if (name === 'mobile' && value.length > 10) {
//         return; // Prevent more than 10 digits for mobile
//       }
//       updateFormData({ [name]: value });
//     } else {
//       updateFormData({ [name]: value });
//     }
//   };
  
//   const validateForm = (): boolean => {
//     const requiredFields = [
//       'contactName', 'email', 'mobile', 
//       'organizationName', 'website'
//     ];
    
//     const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
//     if (missingFields.length > 0) {
//       toast({
//         title: "Missing required fields",
//         description: "Please fill in all required fields before proceeding.",
//         variant: "destructive"
//       });
//       return false;
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast({
//         title: "Invalid email",
//         description: "Please enter a valid email address.",
//         variant: "destructive"
//       });
//       return false;
//     }
    
//     // Mobile validation
//     if (!/^\d{10}$/.test(formData.mobile)) {
//       toast({
//         title: "Invalid mobile number",
//         description: "Mobile number must be 10 digits.",
//         variant: "destructive"
//       });
//       return false;
//     }
    
//     return true;
//   };

//   const handleNext = () => {
//     if (validateForm()) {
//       navigate("/form/page2");
//     }
//   };
  
//   const handleSave = async () => {
//     await saveCurrentData();
//     toast({
//       title: "Progress saved",
//       description: "Your form progress has been saved.",
//     });
//   };

//   return (
//     <FormLayout 
//       onSave={handleSave}
//       onNext={handleNext}
//       currentStep={1}
//       totalSteps={2}
//     >
//       <form className="form-section">
//         <h2 className="form-header">Basic Information</h2>
        
//         <div className="form-group">
//           <Label htmlFor="contactName">Name (Single point of contact) *</Label>
//           <Input
//             id="contactName"
//             name="contactName"
//             value={formData.contactName}
//             onChange={handleInputChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <Label htmlFor="email">Official Email Id *</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your official email"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <Label htmlFor="mobile">Mobile Number *</Label>
//           <Input
//             id="mobile"
//             name="mobile"
//             type="number"
//             value={formData.mobile}
//             onChange={handleInputChange}
//             placeholder="Enter your 10 digit mobile number"
//             maxLength={10}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <Label htmlFor="organizationName">Name of your Organization *</Label>
//           <Input
//             id="organizationName"
//             name="organizationName"
//             value={formData.organizationName}
//             onChange={handleInputChange}
//             placeholder="Enter your organization's name"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <Label htmlFor="website">Organization Website / URL *</Label>
//           <Input
//             id="website"
//             name="website"
//             value={formData.website}
//             onChange={handleInputChange}
//             placeholder="https://example.com"
//             required
//           />
//         </div>
//       </form>
//     </FormLayout>
//   );
// };

// export default FormPage1;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm as useFormContext } from "@/context/FormContext";
import { FormLayout } from "@/components/FormLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";


// ⛔ NOTE: Do not expose this key in production frontend apps

const FormPage1 = () => {
  const { formData, updateFormData, saveCurrentData } = useFormContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [emailExists, setEmailExists] = useState(false);

  // ✅ Prepopulate email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("user-email");
    if (storedEmail) {
      updateFormData({ email: storedEmail.trim().toLowerCase() });
    }
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const normalizedValue = name === "email" ? value.trim().toLowerCase() : value;

    updateFormData({ [name]: normalizedValue });

    if (name === "mobile" && type === "number" && value.length > 10) {
      return;
    }
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "contactName",
      "email",
      "mobile",
      "organizationName",
      "website",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast({
        title: "Invalid mobile number",
        description: "Mobile number must be 10 digits.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/form/page2");
    }
  };

  const handleSave = async () => {
    await saveCurrentData();
    toast({
      title: "Progress saved",
      description: "Your form progress has been saved.",
    });
  };

  return (
    <FormLayout onSave={handleSave} onNext={handleNext} currentStep={1} totalSteps={2}>
      <form className="form-section">
        <h2 className="form-header">Basic Information</h2>

        <div className="form-group">
          <Label htmlFor="contactName">Name (Single point of contact) *</Label>
          <Input
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="email">Official Email Id *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            readOnly
            className="bg-gray-100 text-gray-600 cursor-not-allowed"
            placeholder="Pre-filled from login"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            name="mobile"
            type="number"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your 10 digit mobile number"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="organizationName">Name of your Organization *</Label>
          <Input
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            placeholder="Enter your organization's name"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="website">Organization Website / URL *</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://example.com"
            required
          />
        </div>
      </form>
    </FormLayout>
  );
};

export default FormPage1;
