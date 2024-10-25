using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class LoanApplication
    {
        public int LoanApplicationId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required(ErrorMessage = "Loan ID is required")]
        public int LoanId { get; set; }
        public Loan? Loan { get; set; }

        [Required(ErrorMessage = "Submission date is required")]
        public DateTime SubmissionDate { get; set; }

        [Required(ErrorMessage = "Loan status is required")]
        public int LoanStatus { get; set; } // Consider using an enum for loan status

        [Required(ErrorMessage = "Farm location is required")]
        public string FarmLocation { get; set; }

        [Required(ErrorMessage = "Farmer address is required")]
        public string FarmerAddress { get; set; }

        [Required(ErrorMessage = "Farm size in acres is required")]
        public decimal FarmSizeInAcres { get; set; }

        [Required(ErrorMessage = "Farm purpose is required")]
        public string FarmPurpose { get; set; } // e.g., crop cultivation, broiler farm, poultry farm, etc.

        [Required(ErrorMessage = "File is required")]
        public string File { get; set; }
    }
}
