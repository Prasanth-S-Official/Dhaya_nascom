// export interface LoanApplication {
//     LoanApplicationId?: number;         // Optional ID for the loan application
//     UserId?: number;                    // ID of the user applying for the loan
//     LoanId?: number;                    // ID of the associated loan
//     SubmissionDate: string;             // Date when the loan application was submitted
//     LoanStatus: number;                 // Status of the loan (0: Pending, 1: Approved, 2: Rejected)
//     FarmLocation: string;               // Location of the farm related to the loan application
//     FarmerAddress: string;              
//     FarmSizeInAcres: number;           
//     FarmPurpose: string;               
//     File: string;                      
// }


export interface LoanApplication {
    loanApplicationId?: number;         // Optional ID for the loan application
    userId?: number;                    // ID of the user applying for the loan
    loanId?: number;                    // ID of the associated loan
    submissionDate: string;             // Date when the loan application was submitted
    loanStatus: number;                 // Status of the loan (0: Pending, 1: Approved, 2: Rejected)
    farmLocation: string;               // Location of the farm related to the loan application
    farmerAddress: string;              // Address of the farmer
    farmSizeInAcres: number;            // Size of the farm in acres
    farmPurpose: string;                // Purpose of the farm
    file: string;                       // File associated with the loan application
}