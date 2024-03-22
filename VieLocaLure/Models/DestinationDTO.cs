using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class DestinationListDTO
    {
        public int id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
        public List<string> image { get; set; }
    }

    // Lớp DTO cho endpoint "/api/destination/filter?area=1"
    public class DestinationDTO : DestinationListDTO
    {
        public string url { get; set; }
    }
}
