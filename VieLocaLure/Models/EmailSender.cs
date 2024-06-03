using System.Net;
using System.Net.Mail;

namespace VieLocaLure.Models
{
    public class EmailSender
    {
            public static string Address = null; //Địa chỉ email của bạn
            public static string Password = null; //Mật khẩu ứng dụng

            public void Send(string sendTo, string subject, string message)
            {
                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.Credentials = new NetworkCredential(Address, Password);
                    smtp.Send(Address, sendTo, subject, message);
                }
            }
        
    }
}
