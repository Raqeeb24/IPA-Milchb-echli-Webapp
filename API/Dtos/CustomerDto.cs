using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CustomerDto
    {
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string Address { get; set; }
        [Range(1000, 9999)]
        [Required]
        public int Zip { get; set; }
        [Required]
        public string Place { get; set; }
    }
}
