using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        [Range(1000, 9999)]
        public int Zip { get; set; }
        [Required]
        public string Place { get; set; }

        public List<Transaction> Transactions { get; set; }
    }
}
