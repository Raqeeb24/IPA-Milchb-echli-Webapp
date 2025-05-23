﻿using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        [Required]
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

        public Account Account { get; set; }
        public Customer Customer { get; set; }
    }
}
