using System.ComponentModel.DataAnnotations;

namespace VieLocaLure.Models
{
    public class Area
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
    }
}
