namespace VieLocaLure.Models
{
    public class TourProvinceDTO
    {
        public string title_en { get; set; }
        public string title_vi { get; set; }
        public string image { get; set; }
        public string duration_en { get; set; }
        public string duration_vi { get; set; }
        public string transport_en { get; set; }
        public string transport_vi { get; set; }
        public string description_en { get; set; }
        public string description_vi { get; set; }
        public float adultPrice { get; set; }
        public float childPrice { get; set; }
        public float infantPrice { get; set; }
        public List<DateTime> schedule { get; set; }

    }
}
