using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VieLocaLure.Models
{
    public class TourImage
    {
        // FK- PK
        
        public int TourId { get; set; }
        public int ImageId { get; set; }

        public Tour Tour { get; set; }
        public Image Image { get; set; }
    }
}
