using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Bus
    {
        [Required(ErrorMessage = "Booking ID is required")]
        [Key]
        public int bookingId { get; set; }        

        [Required(ErrorMessage = "Bus number is required")]
        public string busNumber { get; set; }     

        [Required(ErrorMessage = "Route source is required")]
        public string routeSource { get; set; }   

        [Required(ErrorMessage = "Route destination is required")]
        public string routeDestination { get; set; } 

        [Required(ErrorMessage = "Passenger name is required")]
        public string passengerName { get; set; } 

        [Required(ErrorMessage = "Booking date is required")]
        public string bookingDate { get; set; }   
    }
}
