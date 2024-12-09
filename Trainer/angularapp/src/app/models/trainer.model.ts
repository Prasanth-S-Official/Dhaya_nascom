export interface Trainer {
  trainerId?: number;
  name: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  certification: string;
  resume: string; // Base64-encoded resume file
  joiningDate: string;
  status: string; // "Active" or "Inactive"
}
