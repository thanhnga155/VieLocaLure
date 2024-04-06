using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string url { get; set; }
        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination? Destination { get; set; }

        //[JsonIgnore]
        //public ICollection<TourImage> TourImage { get; set; }

        //public ICollection<Tour> Tours { get; set; }
    }
}
