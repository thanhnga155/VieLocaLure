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

        [JsonIgnore]
        public ICollection<Province> Province { get; set; }

    }
    public class AreaDTO : Area
    {
        public string url { get; set; }
    }
}
