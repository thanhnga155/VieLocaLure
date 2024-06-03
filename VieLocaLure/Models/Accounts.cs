using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string gmail { get; set; }
        public string phone_number { get; set; }
        public string gender { get; set; }
        public string image { get; set; }
        public string role { get; set; }
        //1 người dùng có nhiều invoice
        [JsonIgnore]
        public ICollection<InvoiceDetail>? InvoiceDetail { get; set; }

    }
    public class Login
    {
        public string role { get; set; }
        public string accesstoken { get; set; }

        public string username { get; set; }

    }
    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class Profile
    {
        public string name { get; set; }
        public string gmail { get; set; }
        public string phone_number { get; set; }
        public string gender { get; set; }
        public string image { get; set; }

    }
}
