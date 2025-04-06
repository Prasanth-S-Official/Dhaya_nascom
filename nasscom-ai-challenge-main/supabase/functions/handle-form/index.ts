// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// }

// serve(async (req) => {
//   // Handle CORS preflight requests
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   try {
//     // Create a Supabase client with the Auth context of the logged in user
//     const supabaseClient = createClient(
//       Deno.env.get('SUPABASE_URL') ?? '',
//       Deno.env.get('SUPABASE_ANON_KEY') ?? '',
//     )

//     // Get the authorization header from the request
//     const authHeader = req.headers.get('Authorization')
//     if (!authHeader) {
//       throw new Error('No authorization header')
//     }

//     // Get user information from the token
//     const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader.split(' ')[1])
//     if (userError || !user) {
//       throw new Error('Invalid user token')
//     }

//     // Get the form data from the request
//     const formData = await req.formData()
    
//     // Basic Information
//     const contactName = formData.get('contactName')
//     const email = formData.get('email')
//     const mobile = formData.get('mobile')
//     const startupName = formData.get('startupName')
//     const organizationName = formData.get('organizationName')
//     const website = formData.get('website')

//     // Company Information
//     const isRegisteredInIndia = formData.get('isRegisteredInIndia') === 'Yes'
//     const isDpiitCertified = formData.get('isDpiitCertified') === 'Yes'
//     const dpiitNumber = formData.get('dpiitNumber')
//     const dpiitCertificate = formData.get('dpiitCertificate') as File
//     const incorporationDate = formData.get('incorporationDate')
//     const incorporationCertificate = formData.get('incorporationCertificate') as File
//     const businessStage = formData.get('businessStage')
//     const industries = formData.getAll('industries')
//     const otherIndustry = formData.get('otherIndustry')
//     const city = formData.get('city')
//     const femaleFounders = formData.get('femaleFounders')
//     const employees = formData.get('employees')
//     const motivation = formData.get('motivation')
//     const pitchDeck = formData.get('pitchDeck') as File

//     // Approach Note
//     const selectedFields = formData.getAll('selectedFields')
//     const fieldPdfUploads = {} as Record<string, File>
//     for (const field of selectedFields) {
//       const fieldFile = formData.get(`fieldPdf_${field}`) as File
//       if (fieldFile) {
//         fieldPdfUploads[field] = fieldFile
//       }
//     }

//     // Upload files to storage and get their paths
//     const userId = user.id
//     const userFolder = `${userId}`
    
//     // Helper function to upload a file and get its path
//     async function uploadFile(file: File | null, prefix: string): Promise<string | null> {
//       if (!file) return null
      
//       const fileExt = file.name.split('.').pop()
//       const filePath = `${userFolder}/${prefix}_${crypto.randomUUID()}.${fileExt}`
      
//       const { error: uploadError } = await supabaseClient
//         .storage
//         .from('form-files')
//         .upload(filePath, file)

//       if (uploadError) throw uploadError
//       return filePath
//     }

//     // Upload all files
//     const [
//       dpiitCertificatePath,
//       incorporationCertificatePath,
//       pitchDeckPath
//     ] = await Promise.all([
//       uploadFile(dpiitCertificate, 'dpiit'),
//       uploadFile(incorporationCertificate, 'incorporation'),
//       uploadFile(pitchDeck, 'pitch_deck')
//     ])

//     // Upload approach note PDFs and create path mapping
//     const fieldPdfPaths: Record<string, string> = {}
//     await Promise.all(
//       Object.entries(fieldPdfUploads).map(async ([field, file]) => {
//         const path = await uploadFile(file, `approach_${field.toLowerCase()}`)
//         if (path) fieldPdfPaths[field] = path
//       })
//     )

//     // Insert form data into the database
//     const { data, error } = await supabaseClient
//       .from('form_submissions')
//       .insert([
//         {
//           user_id: userId,
//           contact_name: contactName,
//           email,
//           mobile,
//           startup_name: startupName,
//           organization_name: organizationName,
//           website,
//           is_registered_in_india: isRegisteredInIndia,
//           is_dpiit_certified: isDpiitCertified,
//           dpiit_number: dpiitNumber,
//           dpiit_certificate_path: dpiitCertificatePath,
//           incorporation_date: incorporationDate,
//           incorporation_certificate_path: incorporationCertificatePath,
//           business_stage: businessStage,
//           industries,
//           other_industry: otherIndustry,
//           city,
//           female_founders: femaleFounders,
//           employees,
//           motivation,
//           pitch_deck_path: pitchDeckPath,
//           selected_fields: selectedFields,
//           field_pdf_paths: fieldPdfPaths,
//           is_draft: true
//         }
//       ])
//       .select()

//     if (error) {
//       throw error
//     }

//     return new Response(
//       JSON.stringify({ data }),
//       {
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         status: 200,
//       },
//     )

//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       {
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         status: 400,
//       },
//     )
//   }
// }) 

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Initialize Supabase client
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const url = new URL(req.url);

   // =============================
    // ✅ EMAIL CHECK (GET REQUEST)
    // =============================
    if (req.method === "GET" && url.searchParams.get("email")) {
      const email = url.searchParams.get("email")?.trim().toLowerCase();

      if (!email) {
        return new Response(
          JSON.stringify({ error: "Missing email parameter" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      const { data, error } = await supabaseClient
        .from("form_submissions")
        .select("email")
        .ilike("email", email)
        .limit(1);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      return new Response(
        JSON.stringify({ exists: data.length > 0 }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // ✅ Only now check for Content-Type on non-GETs
    const contentType = req.headers.get("content-type") || "";
    if (req.method !== "GET" && !contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing content type" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // =============================
    // 📩 FORM SUBMISSION (POST)
    // =============================

    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(authHeader.split(" ")[1]);

    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    // Parse form data
    const formData = await req.formData();

    const contactName = formData.get("contactName");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const startupName = formData.get("startupName");
    const organizationName = formData.get("organizationName");
    const website = formData.get("website");

    const isRegisteredInIndia = formData.get("isRegisteredInIndia") === "Yes";
    const isDpiitCertified = formData.get("isDpiitCertified") === "Yes";
    const dpiitNumber = formData.get("dpiitNumber");
    const dpiitCertificate = formData.get("dpiitCertificate") as File;
    const incorporationDate = formData.get("incorporationDate");
    const incorporationCertificate = formData.get("incorporationCertificate") as File;
    const businessStage = formData.get("businessStage");
    const industries = formData.getAll("industries");
    const otherIndustry = formData.get("otherIndustry");
    const city = formData.get("city");
    const femaleFounders = formData.get("femaleFounders");
    const employees = formData.get("employees");
    const motivation = formData.get("motivation");
    const pitchDeck = formData.get("pitchDeck") as File;

    const selectedFields = formData.getAll("selectedFields");
    const fieldPdfUploads: Record<string, File> = {};

    for (const field of selectedFields) {
      const fieldFile = formData.get(`fieldPdf_${field}`) as File;
      if (fieldFile) {
        fieldPdfUploads[field.toString()] = fieldFile;
      }
    }

    const userId = user.id;
    const userFolder = `${userId}`;

    async function uploadFile(file: File | null, prefix: string): Promise<string | null> {
      if (!file) return null;
      const ext = file.name.split(".").pop();
      const filePath = `${userFolder}/${prefix}_${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("form-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      return filePath;
    }

    const [
      dpiitCertificatePath,
      incorporationCertificatePath,
      pitchDeckPath,
    ] = await Promise.all([
      uploadFile(dpiitCertificate, "dpiit"),
      uploadFile(incorporationCertificate, "incorporation"),
      uploadFile(pitchDeck, "pitch_deck"),
    ]);

    const fieldPdfPaths: Record<string, string> = {};
    await Promise.all(
      Object.entries(fieldPdfUploads).map(async ([field, file]) => {
        const path = await uploadFile(file, `approach_${field.toLowerCase()}`);
        if (path) fieldPdfPaths[field] = path;
      })
    );

    const { data, error } = await supabaseClient
      .from("form_submissions")
      .insert([
        {
          user_id: userId,
          contact_name: contactName,
          email,
          mobile,
          startup_name: startupName,
          organization_name: organizationName,
          website,
          is_registered_in_india: isRegisteredInIndia,
          is_dpiit_certified: isDpiitCertified,
          dpiit_number: dpiitNumber,
          dpiit_certificate_path: dpiitCertificatePath,
          incorporation_date: incorporationDate,
          incorporation_certificate_path: incorporationCertificatePath,
          business_stage: businessStage,
          industries,
          other_industry: otherIndustry,
          city,
          female_founders: femaleFounders,
          employees,
          motivation,
          pitch_deck_path: pitchDeckPath,
          selected_fields: selectedFields,
          field_pdf_paths: fieldPdfPaths,
          is_draft: true,
        },
      ])
      .select();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
