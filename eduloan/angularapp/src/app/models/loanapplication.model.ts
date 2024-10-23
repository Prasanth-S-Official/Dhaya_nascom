export interface LoanApplication {
    loanApplicationId?: number;
    userId: number;
    loanId: number;
    submissionDate: string;
    institution: string;
    course: string;
    tuitionFee: number;
    loanStatus: number;
    address: string;
    file: string;
}
