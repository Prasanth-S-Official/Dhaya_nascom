export interface Requirement {
  requirementId?: number;
  title: string;
  description: string;
  department: string;
  duration: string;
  mode: string;
  location: string;
  skillLevel: string;
  budget: number;
  priority?: string;
  trainerId?: number; // Link to the trainer
}
