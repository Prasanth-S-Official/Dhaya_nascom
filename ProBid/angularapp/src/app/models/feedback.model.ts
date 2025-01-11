export class Feedback {
  feedbackId?: number; // Optional for new feedback
  feedbackText: string; // Textual feedback provided by the user
  date: Date; // Date when the feedback was submitted
  userId: number; // User ID of the person providing feedback
  projectId?: number; // ID of the project being reviewed (optional)
  bidId?: number; // ID of the associated bid (optional)
  category: string; // Feedback category, e.g., "Communication", "Work Quality"
  rating?: number; // Rating out of 5 (optional)
}
