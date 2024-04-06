using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Area
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
        public string url { get; set; }
        public string content { get; set; }

        [JsonIgnore]
        public ICollection<Province>? Province { get; set; }
    }
}

