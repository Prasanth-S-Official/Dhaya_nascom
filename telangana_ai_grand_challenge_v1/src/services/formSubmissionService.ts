import type { FormData as StartupFormData } from "@/context/FormContext";

export interface FormSubmissionData {
  contact_name: string;
  email: string;
  mobile: string;
  startup_name: string;
  organization_name: string;
  website: string;
  is_registered_in_india: boolean | null;
  is_dpiit_certified: boolean | null;
  dpiit_number: string | null;
  incorporation_date: string | null;
  business_stage: string | null;
  industries: string[];
  other_industry: string | null;
  city: string | null;
  female_founders: string | null;
  employees: string | null;
  motivation: string | null;
  selected_fields: string[];
}

export const mapFormDataToSubmission = async (formData: StartupFormData): Promise<FormSubmissionData> => {
  // Log the complete form data for debugging
  console.log('Form Data:', {
    ...formData,
    // Log file information instead of the actual file objects
    dpiitCertificate: formData.dpiitCertificate ? {
      name: formData.dpiitCertificate.name,
      size: formData.dpiitCertificate.size,
      type: formData.dpiitCertificate.type
    } : null,
    incorporationCertificate: formData.incorporationCertificate ? {
      name: formData.incorporationCertificate.name,
      size: formData.incorporationCertificate.size,
      type: formData.incorporationCertificate.type
    } : null,
    pitchDeck: formData.pitchDeck ? {
      name: formData.pitchDeck.name,
      size: formData.pitchDeck.size,
      type: formData.pitchDeck.type
    } : null,
    fieldPdfUploads: Object.fromEntries(
      Object.entries(formData.fieldPdfUploads).map(([key, file]) => [
        key,
        file ? {
          name: file.name,
          size: file.size,
          type: file.type
        } : null
      ])
    )
  });
  
  return {
    contact_name: formData.contactName,
    email: formData.email,
    mobile: formData.mobile,
    startup_name: formData.startupName || formData.organizationName,
    organization_name: formData.organizationName || "",
    website: formData.website || "",
    is_registered_in_india: formData.isRegisteredInIndia === "Yes" ? true : 
                            formData.isRegisteredInIndia === "No" ? false : null,
    is_dpiit_certified: formData.isDpiitCertified === "Yes" ? true : 
                       formData.isDpiitCertified === "No" ? false : null,
    dpiit_number: formData.dpiitNumber || null,
    incorporation_date: formData.incorporationDate ? 
                        formData.incorporationDate.toISOString().split('T')[0] : null,
    business_stage: formData.businessStage || null,
    industries: formData.industries || [],
    other_industry: formData.otherIndustry || null,
    city: formData.city || null,
    female_founders: formData.femaleFounders || null,
    employees: formData.employees || null,
    motivation: formData.motivation || null,
    selected_fields: formData.selectedFields || []
  };
};

// Helper to generate a stable, deterministic ID based on user form data
const generateStableId = (formData: StartupFormData): string => {
  // Create a unique ID based on the user's email and organization name
  const baseString = `${formData.email}-${formData.organizationName || formData.startupName}`.toLowerCase();
  
  // Simple hash function to generate a more uniform ID
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  // Convert to UUID format using the hash as a seed
  const hashStr = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hashStr}-form-${formData.email.substring(0, 8)}`;
};

export const saveFormSubmission = async (formData: StartupFormData): Promise<{ success: boolean, error?: string, id?: string }> => {
  try {
    console.log("Starting form submission process");

    // Create form data
    const submitFormData = new FormData();

    // Map fields to match the working endpoint format
    submitFormData.append('contactName', formData.contactName);
    submitFormData.append('email', formData.email);
    submitFormData.append('mobile', formData.mobile);
    submitFormData.append('startupName', formData.startupName || formData.organizationName);
    submitFormData.append('organizationName', formData.organizationName);
    submitFormData.append('website', formData.website || '');
    submitFormData.append('isRegisteredInIndia', formData.isRegisteredInIndia || '');
    submitFormData.append('isDpiitCertified', formData.isDpiitCertified || '');
    submitFormData.append('dpiitNumber', formData.dpiitNumber || '');
    submitFormData.append('businessStage', formData.businessStage || '');
    submitFormData.append('industries', JSON.stringify(formData.industries || []));
    submitFormData.append('otherIndustry', formData.otherIndustry || '');
    submitFormData.append('city', formData.city || '');
    submitFormData.append('femaleFounders', formData.femaleFounders || '');
    submitFormData.append('employees', formData.employees || '');
    submitFormData.append('motivation', formData.motivation || '');
    submitFormData.append('selectedFields', JSON.stringify(formData.selectedFields || []));

    // Handle main files
    if (formData.dpiitCertificate) {
      submitFormData.append('files', formData.dpiitCertificate);
    }
    if (formData.incorporationCertificate) {
      submitFormData.append('files', formData.incorporationCertificate);
    }
    if (formData.pitchDeck) {
      submitFormData.append('files', formData.pitchDeck);
    }

    // Handle use case files
    if (formData.fieldPdfUploads) {
      Object.entries(formData.fieldPdfUploads).forEach(([field, file]) => {
        if (file) {
          submitFormData.append('files', file);
        }
      });
    }

      const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbmZlb2FzZWllcGpsd3hmeHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODcyODIsImV4cCI6MjA1OTM2MzI4Mn0.8fLJtZi1siljidzfvXw4wrErtP8_QmxbZoaW9EuKX50';

    if (!serviceRoleKey) {
      throw new Error('Supabase service role key is not configured');
    }

    // Log the form data being sent for debugging
    const formDataEntries = Object.fromEntries(submitFormData.entries());
    console.log('Form data being sent:', {
      ...formDataEntries,
      // Log file entries with original names
      files: Array.from(submitFormData.entries())
        .filter(([key, value]) => value instanceof File)
        .map(([key, value]) => (value as File).name)
    });

    // Submit to the working endpoint
    const response = await fetch('https://gmnfeoaseiepjlwxfxwz.supabase.co/functions/v1/hyper-service', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      },
      body: submitFormData,
    });

    // Log the response headers for debugging
    console.log('Response headers:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.error || `Failed to submit form: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, id: result.data?.id };

  } catch (error) {
    console.error("Exception during form submission:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
