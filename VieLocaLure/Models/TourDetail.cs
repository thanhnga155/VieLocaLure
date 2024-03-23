using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class TourDetail
    {
        [Key]
        public int Id { get; set; }
        public DateTime departureDate { get; set; }
        public string tourCode { get; set; }
        public float adultPrice { get; set; }
        public float childPrice { get; set; }
        public float infantPrice { get; set; }
        [JsonIgnore]
        public int TourId { get; set; }
        [JsonIgnore]
        public Tour Tour { get; set; }

    }
}
