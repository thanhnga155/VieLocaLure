using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VieLocaLure.Models
{
    public class Banner
    {
        [Key]
        public int Id { get; set; }
        public string caption1_en { get; set; }
        public string caption2_en { get; set; }
        public string caption3_en { get; set; }
        public string caption1_vi { get; set; }
        public string caption2_vi { get; set; }
        public string caption3_vi { get; set; }
        public string image { get; set; }

        //public int tour_id { get; set; }

    }
}

