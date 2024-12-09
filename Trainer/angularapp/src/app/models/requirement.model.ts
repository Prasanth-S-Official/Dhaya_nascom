export interface Requirement {
  requirementId?: number; // Matches requirementId in the backend
  title: string; // Matches title in the backend
  description: string; // Matches description in the backend
  department: string; // Matches department in the backend
  postedDate: string; // Matches postedDate in the backend (optional since it's usually set by the backend)
  status: string; // Matches status in the backend (optional)
  duration: string; // Matches duration in the backend
  mode: string; // Matches mode in the backend
  location: string; // Matches location in the backend
  skillLevel: string; // Matches skillLevel in the backend
  budget: number; // Matches budget in the backend
  priority: string; // Matches priority in the backend (optional)
  trainerId?: number; // Matches trainerId reference in the backend
}
