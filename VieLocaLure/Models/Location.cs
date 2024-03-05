using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VieLocaLure.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }

        [ForeignKey("Id_image")]
        //sinh FK
        public Image Image { get; set; }

        [ForeignKey("Id_province")]
        //sinh FK
        public Province Province { get; set; }

    }
}
