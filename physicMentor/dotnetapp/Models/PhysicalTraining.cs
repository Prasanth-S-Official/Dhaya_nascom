using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class PhysicalTraining
    {
        public int PhysicalTrainingId { get; set; }

        [Required(ErrorMessage = "Training name is required")]
        public string TrainingName { get; set; } // E.g., Strength Training, Yoga, Pilates

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; } // Description of the training

        [Required(ErrorMessage = "Trainer name is required")]
        public string TrainerName { get; set; } // Name of the trainer leading the session

        [Required(ErrorMessage = "Location is required")]
        public string Location { get; set; } // Physical location, e.g., Gym, Park, Studio

        [Required(ErrorMessage = "Indoor/Outdoor information is required")]
        public bool IsIndoor { get; set; } // True for indoor training, false for outdoor

        [Required(ErrorMessage = "Fee is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Fee must be a non-negative value")]
        public decimal Fee { get; set; } // Cost for attending the training

        [Required(ErrorMessage = "Focus area is required")]
        public string FocusArea { get; set; } // Specific physical focus (e.g., cardio, strength, flexibility)

        [Required(ErrorMessage = "Physical requirements are required")]
        public string PhysicalRequirements { get; set; } // Any physical requirements or prerequisites for participation

    }
}
