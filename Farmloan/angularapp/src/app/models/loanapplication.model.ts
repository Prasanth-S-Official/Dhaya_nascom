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
    loanApplicationId?: number;         
    userId?: number;                   
    loanId?: number;                    
    submissionDate: string;             
    loanStatus: number;                 // Status of the loan (0: Pending, 1: Approved, 2: Rejected)
    farmLocation: string;               
    farmerAddress: string;             
    farmSizeInAcres: number;            
    farmPurpose: string;               
    file: string;                       
}