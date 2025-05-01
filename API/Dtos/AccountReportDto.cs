namespace API.Dtos
{
    public class AccountReportDto
    {
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public int CategoryId { get; set; }
        public decimal TotalAmount { get; set; }
        public int CustomerId { get; set; }
    }
}
