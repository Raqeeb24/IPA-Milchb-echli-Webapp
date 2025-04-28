using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        [Required]
        public string AccountName { get; set; }
        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
