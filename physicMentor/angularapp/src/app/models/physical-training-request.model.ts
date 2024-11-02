export interface PhysicalTrainingRequest {
    physicalTrainingRequestId?: number;
    userId: number;                 // ID of the user requesting the training
    physicalTrainingId: number;     // ID of the training being requested
    requestDate: string;            // Date of the request (use ISO format: YYYY-MM-DD)
    status: string;                 // E.g., Pending, Approved, Rejected
    healthConditions: string;       // Health conditions the trainer should be aware of
    fitnessGoals: string;           // User’s goals for the training (e.g., weight loss, muscle gain)
    comments?: string;              // Additional comments or requests from the user
  }
  