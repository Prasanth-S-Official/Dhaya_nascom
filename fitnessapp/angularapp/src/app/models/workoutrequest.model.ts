export interface WorkoutRequest {
  _id?: string; // Use string for MongoDB ObjectId
  userId?: string; // Now represents the MongoDB ObjectId of the user
  workoutId?: string; // Now represents the MongoDB ObjectId of the workout
  age: number;
  bmi: number;
  gender: string;
  dietaryPreferences: string;
  medicalHistory: string;
  requestedDate: string;
  requestStatus: string;
}
