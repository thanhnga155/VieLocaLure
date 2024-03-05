using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VieLocaLure.Models
{
    public class Province
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }

        [ForeignKey("Id_area")]
        //sinh FK
        public Area Area { get; set; }
    }
}
