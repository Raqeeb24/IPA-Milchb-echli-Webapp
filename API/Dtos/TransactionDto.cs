using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class TransactionDto
    {
        [Required]
        [Range(1000, 9999)]
        public int AccountId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [RegularExpression(@"^\d+.?\d{0,2}$")]
        public decimal Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int CustomerId { get; set; }
    }
}
