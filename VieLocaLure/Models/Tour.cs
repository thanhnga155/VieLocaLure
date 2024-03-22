using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Migrations;

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
    }
}
