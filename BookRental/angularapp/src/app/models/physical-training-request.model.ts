export interface PhysicalTrainingRequest {
    physicalTrainingRequestId?: number;
    userId: number;                 
    physicalTrainingId: number;    
    requestDate: string;            // Date of the request (use ISO format: YYYY-MM-DD)
    status: string;                 // E.g., Pending, Approved, Rejected
    healthConditions: string;       
    fitnessGoals: string;           
    comments?: string;              // Additional comments or requests from the user
  }
  