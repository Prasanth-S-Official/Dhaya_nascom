export interface Loan {
    LoanId?: number;
    LoanType: string;
    Description: string;
    InterestRate: number;
    MaximumAmount: number;
    RepaymentTenure: number;  // Added new field for repayment tenure
    Eligibility: string;      // Added new field for eligibility criteria
    DocumentsRequired: string; // Added new field for required documents
}
