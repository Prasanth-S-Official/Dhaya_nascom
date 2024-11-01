export interface PhysicalTraining {
    PhysicalTrainingId?: number;
    TrainingName: string;            // E.g., Strength Training, Yoga, Pilates
    Description: string;             // Description of the training
    TrainerName: string;             // Name of the trainer leading the session
    Location: string;                // Physical location, e.g., Gym, Park, Studio
    IsIndoor: boolean;               // True for indoor training, false for outdoor
    Fee: number;                     // Cost for attending the training
    FocusArea: string;               // Specific physical focus (e.g., cardio, strength, flexibility)
    PhysicalRequirements: string;     // Physical requirements or prerequisites for participation
}
