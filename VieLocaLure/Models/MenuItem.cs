using System.ComponentModel.DataAnnotations;

namespace VieLocaLure.Models
{
    public class MenuItem
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
        public int level { get; set; }
        public string url { get; set; }
        
    }
}
