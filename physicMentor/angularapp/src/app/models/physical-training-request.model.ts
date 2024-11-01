
export interface PhysicalTrainingRequest {
    PhysicalTrainingRequestId?: number;
    UserId: number;                 // ID of the user requesting the training
    PhysicalTrainingId: number;     // ID of the training being requested
    RequestDate: string;            // Date of the request (use ISO format: YYYY-MM-DD)
    Status: string;                 // E.g., Pending, Approved, Rejected
    HealthConditions: string;       // Health conditions the trainer should be aware of
    FitnessGoals: string;           // User’s goals for the training (e.g., weight loss, muscle gain)
    Comments?: string;              // Additional comments or requests from the user
}
