export class Feedback {
  feedbackId?: number; // Optional for new feedback
  userId: number; // User ID who submitted the feedback
  trainerId: number; // Material ID for which feedback is submitted
  category: string; // Feedback category (e.g., "Service", "Pricing")
  feedbackText: string; // Feedback text content
  date: Date; // Date when the feedback was submitted
}
