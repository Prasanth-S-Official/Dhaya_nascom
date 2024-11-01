using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class PhysicalTrainingRequest
    {
        public int PhysicalTrainingRequestId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; } // ID of the user requesting the training
        public User? User { get; set; }

        [Required(ErrorMessage = "Physical Training ID is required")]
        public int PhysicalTrainingId { get; set; } // ID of the training being requested
        public PhysicalTraining? PhysicalTraining { get; set; }

        [Required(ErrorMessage = "Request date is required")]
        [DataType(DataType.Date)]
        public string RequestDate { get; set; } // Date of the request

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; } // E.g., Pending, Approved, Rejected
        [Required]

        public string HealthConditions { get; set; } // Health conditions the trainer should be aware of

        [Required]
        public string FitnessGoals { get; set; } // User’s goals for the training (e.g., weight loss, muscle gain)

        public string? Comments { get; set; } // Additional comments or requests from the user
    }
}
