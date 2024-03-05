using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using VieLocaLure.Models;

namespace VieLocaLure.Data
{
    public class VieLocaLureDB : DbContext
    {
        public VieLocaLureDB(DbContextOptions<VieLocaLureDB> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //OnModelCreating bắt sự kiện tạo db, config ở đây 
            modelBuilder.Entity<Banner>().HasData(new Banner {Id= 1, caption1_en = "special value tour", caption1_vi = "gói tour đặc biệt", caption2_en = "panorama of vietnam", caption2_vi = "toàn cảnh việt nam", caption3_en = "Departing on Apr 5, 2024", caption3_vi = "khởi hành 05/04/2024", image = "https://zoomtravel.vn/upload/images/samten-hills-0.jpg" });
            modelBuilder.Entity<Banner>().HasData(new Banner {Id= 2, caption1_en = "once upon an old time", caption1_vi = "vang bóng một thời", caption2_en = "Hue Historic Citadel", caption2_vi = "Kinh thành Huế", caption3_en = "Departing on Mar 20, 2024", caption3_vi = "khởi hành 20/03/2024", image = "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg" });
            //mỗi lần thêm vào chạy add-migration 
        }
        //mỗi lần add table thì DbSet thêm 1 lần
        public DbSet<Banner> banners { get; set; }
        public DbSet<Area> areas { get; set; }
        public DbSet<Image> images { get; set; }
        public DbSet<Location> locations { get; set; }
        public DbSet<Province> provinces { get; set; }
        public DbSet<Tour> tours { get; set; }
        public DbSet<Accounts> accounts { get; set; }

    }
}
