using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Destination
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
        //sinh FK
        [Required]
        [JsonIgnore]
        public int ProvinceId { get; set; }
        [JsonIgnore]
        public Province Province { get; set; }
        [JsonIgnore]
        //một destination có nhiều image (quan hệ 1-n)
        public ICollection<Image> Image { get; set; }
        //public ICollection<DestinationImage> DestinationImage { get; set; }


    }
}
