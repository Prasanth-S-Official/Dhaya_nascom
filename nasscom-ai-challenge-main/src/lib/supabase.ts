import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gmnfeoaseiepjlwxfxwz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbmZlb2FzZWllcGpsd3hmeHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODcyODIsImV4cCI6MjA1OTM2MzI4Mn0.8fLJtZi1siljidzfvXw4wrErtP8_QmxbZoaW9EuKX50'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 