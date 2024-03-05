using System.ComponentModel.DataAnnotations;

namespace VieLocaLure.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string url { get; set; }
    }
}
