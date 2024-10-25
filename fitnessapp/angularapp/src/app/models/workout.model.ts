export interface Workout {
  _id?: string;
  workoutName: string;
  description: string;
  difficultyLevel: number;
  createdAt?: string; // createdAt is set on the server, so it's optional in the form
  targetArea: string;
  daysPerWeek: number;
  averageWorkoutDurationInMinutes: number;
}
