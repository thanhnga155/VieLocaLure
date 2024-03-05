using System.ComponentModel.DataAnnotations;

namespace VieLocaLure.Models
{
    public class Accounts
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string gmail { get; set; }
        public string phone_number { get; set; }
    }
}
