using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VieLocaLure.Models
{
    public class Tour
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }
        public DateTime start_day { get; set; }
        public DateTime end_day { get; set; }
        public int tour_time { get; set; }
        public double tour_price { get; set; }   
        public int quantity { get; set; }
        
        [ForeignKey("Id_location")]
        //sinh FK
        public Location Location { get; set; }
    }
}
