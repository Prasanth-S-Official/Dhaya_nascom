export class Feedback {
  feedbackId?: number; // Optional since it will be auto-generated
  feedbackText: string; // Feedback content
  date: Date; // Feedback date
  userId: number; // ID of the user providing feedback
  agentId?: number; // Optional, ID of the support agent receiving feedback
  ticketId: number; // ID of the related ticket
  category: string; // Feedback category
  rating: number; // Feedback rating (1-5)
}
