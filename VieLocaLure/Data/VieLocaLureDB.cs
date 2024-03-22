using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using VieLocaLure.Models;

namespace VieLocaLure.Data
{
    public class VieLocaLureDB : DbContext
    {
        public VieLocaLureDB(DbContextOptions<VieLocaLureDB> options) : base(options) { }
        //mỗi lần add table thì DbSet thêm 1 lần
        public DbSet<Accounts> accounts { get; set; }
        public DbSet<Banner> banners { get; set; }
        public DbSet<Area> areas { get; set; }
        public DbSet<Image> images { get; set; }
        public DbSet<Province> provinces { get; set; }
        public DbSet<Destination> destinations { get; set; }
        public DbSet<TourImage> tourImages { get; set; }
        public DbSet<Tour> tours { get; set; }
        public DbSet<TourDetail> tourDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TourImage>()
                .HasKey(di => new { di.TourId, di.ImageId });
            /*            modelBuilder.Entity<Province>()
                            .HasOne(p => p.Area)
                            .WithMany(a => a.Province)
                            .HasForeignKey(p => p.Id_area);
                        modelBuilder.Entity<Area>()
                            .HasMany(p => p.Province)
                            .WithOne(a => a.Area)
                            .HasForeignKey(p => p.Id);*/

            //OnModelCreating bắt sự kiện tạo db, config ở đây 
            modelBuilder.Entity<Banner>().HasData(new Banner { Id = 1, caption1_en = "special value tour", caption1_vi = "gói tour đặc biệt", caption2_en = "panorama of vietnam", caption2_vi = "toàn cảnh việt nam", caption3_en = "Departing on Apr 5, 2024", caption3_vi = "khởi hành 05/04/2024", image = "https://zoomtravel.vn/upload/images/samten-hills-0.jpg" });
            modelBuilder.Entity<Banner>().HasData(new Banner { Id = 2, caption1_en = "once upon an old time", caption1_vi = "vang bóng một thời", caption2_en = "Hue Historic Citadel", caption2_vi = "Kinh thành Huế", caption3_en = "Departing on Mar 20, 2024", caption3_vi = "khởi hành 20/03/2024", image = "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg" });
            //mỗi lần thêm vào chạy add-migration 

            modelBuilder.Entity<Area>().HasData(new Area { Id = 1, name_en = "North Vietnam", name_vi = "Miền Bắc", url= "/destination/north-vietnam" });
            modelBuilder.Entity<Area>().HasData(new Area
            {
                Id = 2,
                name_en = "Central Vietnam",
                name_vi = "Miền Trung",
                url= "/destination/central-vietnam"

            }) ;
            modelBuilder.Entity<Area>().HasData(new Area
            {
                Id = 3,
                name_en = "South Vietnam",
                name_vi = "Miền Nam",
                url= "/destination/south-vietnam"
            });
            modelBuilder.Entity<Province>().HasData(new Province
            {
                Id = 1,
                name_en = "Ha Noi",
                name_vi = "Hà Nội",
                AreaId = 1
            });
            modelBuilder.Entity<Province>().HasData(new Province
            {
                Id = 2,
                name_en = "Ho Chi Minh City",
                name_vi = "Thành phố Hồ Chí Minh",
                AreaId = 3
            });
            modelBuilder.Entity<Province>().HasData(new Province
            {
                Id = 3,
                name_en = "Quang Binh",
                name_vi = "Quảng Bình",
                AreaId = 2
            });
            modelBuilder.Entity<Province>().HasData(new Province
            {
                Id = 4,
                name_en = "Ha Noi",
                name_vi = "Hà Nội",
                AreaId = 1
            });
            //data image
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 1,
                url = "https://hochiminh.vn/Uploads/Images/2022/11/14/6/ttxvnlangc-1589207452-48.jpg",
                DestinationId = 4,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 2,
                url = "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg",
                DestinationId = 3,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 3,
                url = "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg",
                DestinationId= 1,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 4,
                url = "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg",
                DestinationId = 2,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 5,
                url = "https://cdn.tgdd.vn/Files/2021/07/05/1365760/kinh-nghiem-du-lich-kham-pha-dong-phong-nha-ke-bang-quang-binh-202107051210588725.jpg",
                DestinationId = 2,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 6,
                url = "https://bizweb.dktcdn.net/100/366/377/files/lang-bac-ho.jpg?v=1699677034595",
                DestinationId = 4,
            });
            /*
                        modelBuilder.Entity<Tour>().HasData(new Tour
                        {
                            Id = 1,
                            title_en = "Ho Hoan Kiem - Ho Tay",
                            title_vi = "Hồ Hoàn Kiếm - Hồ Tây",
                            duration_en = "Half Day",
                            duration_vi = "Nửa Ngày",
                            transport_en = "Bus",
                            transport_vi = "Xe buýt"
                        });
            */

            modelBuilder.Entity<Destination>().HasData(new Destination
            {
                Id = 1,
                name_en = "Landmark 81",
                name_vi = "Tòa nhà Landmark 81",
                ProvinceId = 2
            });
            modelBuilder.Entity<Destination>().HasData(new Destination
            {
                Id = 2,
                name_en = "Phong Nha - Ke Bang",
                name_vi = "Phong Nha - Kẻ Bàng",
                ProvinceId = 3
            });
            modelBuilder.Entity<Destination>().HasData(new Destination
            {
                Id = 3,
                name_en = "One Pillar pagoda",
                name_vi = "Chùa Một Cột",
                ProvinceId = 1
            });
            modelBuilder.Entity<Destination>().HasData(new Destination
            {
                Id = 4,
                name_en = "Ho Chi Minh Mausoleum",
                name_vi = "Lăng Chủ Tịch Hồ Chí Minh",
                ProvinceId = 1
            });
        }
    }

}
