using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

    }
}
