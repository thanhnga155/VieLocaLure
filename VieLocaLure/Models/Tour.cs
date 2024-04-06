using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Tour
    {
        [Key]
        public int Id { get; set; }
        public string title_en{ get; set; }
        public string title_vi { get; set; }
        public string duration_en { get; set; }
        public string duration_vi { get; set; }
        public string transport_en { get; set; }
        public string transport_vi { get; set; }
        public string content_en { get; set; }
        public string content_vi { get; set; }
        public string url { get; set; }
        //FK tourDetail: 1 tour có nhiều tourDetail
        [JsonIgnore]
        public ICollection<TourDetail>? TourDetail { get; set; }
        [JsonIgnore]
        public ICollection<TourDestination>? TourDestination { get; set; }
    }
    public class SearchParameters
    {
        public string Keywords { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public int? Area { get; set; }
    }

}
