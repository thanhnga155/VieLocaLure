using Microsoft.EntityFrameworkCore.Migrations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Province
    {
        [Key]
        public int Id { get; set; }
        public string name_en { get; set; }
        public string name_vi { get; set; }

        //sinh FK
        [Required]
        public int AreaId { get; set; }
        [JsonIgnore]

        public Area? Area { get; set; }

        [JsonIgnore]
        public ICollection<Destination>? Destination { get; set; }
    }
}
