export interface Feedback {
  feedbackId?: number;
  feedbackText: string;
  date: Date;
  userId: number;
  driverId?: number; // Optional for non-driver feedback
  category: string;
  rating: number;
}
