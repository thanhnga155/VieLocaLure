using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class InvoiceDetail
    {
        [Key]
        public int Id { get; set; }
        public int count_adult { get; set; }
        public int count_child { get; set; }
        public int count_infant { get; set; }
        public string payment_method { get; set; }
        public float totalPrice { get; set; }
        public int AccountId { get; set; }
        [JsonIgnore]
        public Account? Account { get; set; }
        public int TourId { get; set; }
        [JsonIgnore]
        public Tour? Tour { get; set; }
        [JsonIgnore]
        public ICollection<Invoice>? Invoice { get; set; }
    }
}
