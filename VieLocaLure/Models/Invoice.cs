using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public float amount { get; set; }
        public DateTime createdOn { get; set; }
        public DateTime payment_date { get; set; }
        public string status { get; set; }
        public int InvoiceDetailId { get; set; }
        [JsonIgnore]
        public InvoiceDetail? InvoiceDetail { get; set; }
    }
}
