using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Loan
    {        
        public int LoanId { get; set; }

        [Required(ErrorMessage = "Loan type is required")]
        public string LoanType { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Interest rate is required")]
        public decimal InterestRate { get; set; }

        [Required(ErrorMessage = "Maximum amount is required")]
        public decimal MaximumAmount { get; set; }

        [Required(ErrorMessage = "Repayment tenure is required")]
        public int RepaymentTenure { get; set; } // in months or years

        [Required(ErrorMessage = "Eligibility is required")]
        public string Eligibility { get; set; }

        [Required(ErrorMessage = "Documents required are required")]
        public string DocumentsRequired { get; set; }
    }
}
