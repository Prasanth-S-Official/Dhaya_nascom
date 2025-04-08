-- Create the form_submissions table
CREATE TABLE form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    
    -- Basic Information (Page 1)
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    startup_name TEXT NOT NULL,
    organization_name TEXT NOT NULL,
    website TEXT NOT NULL,

    -- Company Information (Page 2)
    is_registered_in_india BOOLEAN,
    is_dpiit_certified BOOLEAN,
    dpiit_number TEXT,
    dpiit_certificate_path TEXT,
    incorporation_date DATE,
    incorporation_certificate_path TEXT,
    business_stage TEXT,
    industries TEXT[],
    other_industry TEXT,
    city TEXT,
    female_founders TEXT,
    employees TEXT,
    motivation TEXT,
    pitch_deck_path TEXT,

    -- Approach Note (Page 3)
    selected_fields TEXT[],
    field_pdf_paths JSONB, -- Stores field name to file path mapping

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    is_draft BOOLEAN DEFAULT true
);

-- Create RLS policies
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own submissions
CREATE POLICY "Users can insert their own submissions" ON form_submissions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own submissions
CREATE POLICY "Users can view their own submissions" ON form_submissions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy to allow users to update their draft submissions
CREATE POLICY "Users can update their draft submissions" ON form_submissions
    FOR UPDATE
    USING (auth.uid() = user_id AND is_draft = true)
    WITH CHECK (auth.uid() = user_id AND is_draft = true);

-- Create storage bucket for files
INSERT INTO storage.buckets (id, name, public)
VALUES ('form-files', 'form-files', false);

-- Storage policies
CREATE POLICY "Users can upload their own files"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'form-files'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view their own files"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'form-files'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 