export interface Bid {
    bidId?: number; // Optional for new bids
    projectId: number; // ID of the project being bid on
    userId: number; // ID of the freelancer submitting the bid
    bidAmount: number; // Amount the freelancer is bidding
    proposal: string; // Detailed proposal/message
    submissionDate: string; // Timestamp when the bid was submitted (ISO format)
    status: string; // "Pending", "Accepted", "Rejected", "Withdrawn"
    timeEstimation: string; // Estimated time required to complete the project
    resumeImage?: string; // Resume image as a Base64 string
    communicationPreference: string; // Preferred mode of communication
    rating?: number; // Client's rating of the freelancer (optional)
    withdrawReason?: string; // Reason for withdrawal (optional)
  }
  