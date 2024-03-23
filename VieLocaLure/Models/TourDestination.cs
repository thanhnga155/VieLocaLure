using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class TourDestination
    {
        // FK- PK

        public int TourId { get; set; }
        public int DestinationId { get; set; }

        [JsonIgnore]

        public Tour Tour { get; set; }

        [JsonIgnore]
        public Destination Destination { get; set; }
    }
}
