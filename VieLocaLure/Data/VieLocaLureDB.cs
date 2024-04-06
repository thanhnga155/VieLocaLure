using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
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
        public DbSet<TourDestination> tourDestinations { get; set; }
        public DbSet<Tour> tours { get; set; }
        public DbSet<TourDetail> tourDetails { get; set; }
        public DbSet<MenuItem> menuItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //quan hệ n-n Tour-Image
/*            modelBuilder.Entity<TourImage>()
                .HasKey(di => new { di.TourId, di.ImageId });*/
            //quan hệ n-n Tour-Destination
            modelBuilder.Entity<TourDestination>()
            .HasKey(di => new { di.TourId, di.DestinationId });
            /*            modelBuilder.Entity<Province>()
                            .HasOne(p => p.Area)
                            .WithMany(a => a.Province)
                            .HasForeignKey(p => p.Id_area);
                        modelBuilder.Entity<Area>()
                            .HasMany(p => p.Province)
                            .WithOne(a => a.Area)
                            .HasForeignKey(p => p.Id);*/

            //OnModelCreating bắt sự kiện tạo db, config ở đây 
            modelBuilder.Entity<Banner>().HasData(new Banner { Id = 1, caption1_en = "special value tour", caption1_vi = "gói tour đặc biệt", caption2_en = "panorama of vietnam", caption2_vi = "toàn cảnh việt nam", caption3_en = "Departing on Apr 5, 2024", caption3_vi = "khởi hành 05/04/2024", image = "/Uploads/vang-bong-mot-thoi.jpg", url = "/tour/panorama-of-vietnam" });
            modelBuilder.Entity<Banner>().HasData(new Banner { Id = 2, caption1_en = "once upon an old time", caption1_vi = "vang bóng một thời", caption2_en = "Hue Historic Citadel", caption2_vi = "Kinh thành Huế", caption3_en = "Departing on Mar 20, 2024", caption3_vi = "khởi hành 20/03/2024", image = "/Uploads/kinh-thanh-hue.jpg", url = "/tour/kinh-thanh-hue" });
            //mỗi lần thêm vào chạy add-migration 
            modelBuilder.Entity<MenuItem>().HasData(new MenuItem
            {
                Id = 1,
                name_en = "Homepage",
                name_vi = "Trang chủ",
                level= 1,
                url = "/",
            });
            modelBuilder.Entity<MenuItem>().HasData(new MenuItem
            {
                Id = 2,
                name_en = "Destination",
                name_vi = "Điểm đến",
                level= 1,
                url = "/destination",
            });
            modelBuilder.Entity<MenuItem>().HasData(new MenuItem
            {
                Id = 3,
                name_en = "Tour",
                name_vi = "Tour du lịch",
                level=1,
                url = "/tour",
            });
            modelBuilder.Entity<MenuItem>().HasData(new MenuItem
            {
                Id = 4,
                name_en = "Contact",
                name_vi = "Liên hệ",
                level= 1,
                url = "/contact",
            });
            modelBuilder.Entity<Area>().HasData(new Area { Id = 1, name_en = "North Vietnam", name_vi = "Miền Bắc", url = "/destination/north-vietnam", content = "`\r\n        <p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`" });
            modelBuilder.Entity<Area>().HasData(new Area
            {
                Id = 2,
                name_en = "Central Vietnam",
                name_vi = "Miền Trung",
                url = "/destination/central-vietnam",
                content = "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`"

            });
            modelBuilder.Entity<Area>().HasData(new Area
            {
                Id = 3,
                name_en = "South Vietnam",
                name_vi = "Miền Nam",
                url = "/destination/south-vietnam",
                content = "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`"
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
                name_en = "Ninh Binh",
                name_vi = "Ninh Bình",
                AreaId = 1
            });
            modelBuilder.Entity<Province>().HasData(
            new Province
            {
                Id = 5,
                name_en = "Hai Phong",
                name_vi = "Hải Phòng",
                AreaId = 1
            },
            new Province
            {
                Id = 6,
                name_en = "Lao Cai",
                name_vi = "Lào Cai",
                AreaId = 1
            },
            new Province
            {
                Id = 7,
                name_en = "Hue",
                name_vi = "Huế",
                AreaId = 2
            }, new Province
            {
                Id = 8,
                name_en = "Khanh Hoa",
                name_vi = "Khánh Hòa",
                AreaId = 2
            }, new Province
            {
                Id = 9,
                name_en = "Vung Tau",
                name_vi = "Vũng Tàu",
                AreaId = 3
            }, new Province
            {
                Id = 10,
                name_en = "Kien Giang",
                name_vi = "Kiên Giang",
                AreaId = 3
            }, new Province
            {
                Id = 11,
                name_en = "Ca Mau",
                name_vi = "Cà Mau",
                AreaId = 3
            }, new Province
            {
                Id = 12,
                name_en = "Ben Tre",
                name_vi = "Bến Tre",
                AreaId = 3
            }
            );
            //data image
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 1,
                url = "/Uploads/lang-chu-tich-HCM.jpg",
                DestinationId = 4,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 2,
                url = "/Uploads/canh-thanh-pho-HCM.jpg",
                DestinationId = 3,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 3,
                url = "/Uploads/landmark81.jpeg",
                DestinationId = 1,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 4,
                url = "/Uploads/dong-phong-nha-ke-bang.jpg",
                DestinationId = 2,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 5,
                url = "/Uploads/phong-nha-ke-bang-2.jpg",
                DestinationId = 2,
            });
            modelBuilder.Entity<Image>().HasData(new Image
            {
                Id = 6,
                url = "/Uploads/lang-bac-ho.jpg",
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
            },
            new Destination
            {
                Id = 5,
                name_en = "Nhat Le Beach",
                name_vi = "Biển Nhật Lệ",
                ProvinceId = 3
            },
            new Destination
            {
                Id = 6,
                name_en = "Hoa Lu ancient capital",
                name_vi = "Cố đô Hoa Lư",
                ProvinceId = 4
            }, new Destination
            {
                Id = 7,
                name_en = "Trang An scenic spot",
                name_vi = "Danh thắng Tràng An",
                ProvinceId = 4
            }, new Destination
            {
                Id = 8,
                name_en = "Cat Ba island",
                name_vi = "Đảo Cát Bà",
                ProvinceId = 5
            }, new Destination
            {
                Id = 9,
                name_en = "Do Son beach",
                name_vi = "Bãi biển Đồ Sơn",
                ProvinceId = 5
            }, new Destination
            {
                Id = 10,
                name_en = "Sapa",
                name_vi = "Sapa",
                ProvinceId = 6
            }, new Destination
            {
                Id = 11,
                name_en = "Co Tien mountain",
                name_vi = "Núi cô Tiên",
                ProvinceId = 6
            }, new Destination
            {
                Id = 12,
                name_en = "Hue Citadel - Imperial Citadel",
                name_vi = "Kinh Thành Huế- Đại Nội",
                ProvinceId = 7
            }, new Destination
            {
                Id = 13,
                name_en = "Huong river",
                name_vi = "Sông Hương",
                ProvinceId = 7
            }, new Destination
            {
                Id = 14,
                name_en = "Thiên Mụ pagoda",
                name_vi = "Chùa Thiên Mụ",
                ProvinceId = 7
            }, new Destination
            {
                Id = 15,
                name_en = "Hon Chong Hon Vo Nha Trang",
                name_vi = "Hòn Chồng Hòn Vợ Nha Trang",
                ProvinceId = 8
            }, new Destination
            {
                Id = 16,
                name_en = "Thap Ba Ponagar",
                name_vi = "Tháp Bà",
                ProvinceId = 8
            }, new Destination
            {
                Id = 17,
                name_en = "Ho Tram",
                name_vi = "Hồ Tràm",
                ProvinceId = 9
            }, new Destination
            {
                Id = 18,
                name_en = "Vung Tau beach",
                name_vi = "Bãi biển Vũng Tàu",
                ProvinceId = 9
            }, new Destination
            {
                Id = 19,
                name_en = "Phu Quoc island",
                name_vi = "Đảo Phú Quốc",
                ProvinceId = 10
            }, new Destination
            {
                Id = 20,
                name_en = "U Minh Thuong National Park",
                name_vi = "Vườn quốc gia U Minh Thượng",
                ProvinceId = 10
            }, new Destination
            {
                Id = 21,
                name_en = "Ca Mau floating market",
                name_vi = "Chợ nổi Cà Mau",
                ProvinceId = 11
            }, new Destination
            {
                Id = 22,
                name_en = "Ca Mau mangrove forest",
                name_vi = "Rừng ngập mặn Cà Mau",
                ProvinceId = 11
            }, new Destination
            {
                Id = 23,
                name_en = "Phu Da Island",
                name_vi = "Cồn Phú Đa",
                ProvinceId = 12
            }, new Destination
            {
                Id = 24,
                name_en = "Bach Van Pagoda",
                name_vi = "Chùa Bạch Vân",
                ProvinceId = 12
            }
            );
            //tour
            modelBuilder.Entity<Tour>().HasData(
            new Tour
            {
                Id = 1,
                title_en = "Nordic Travel [Denmark - Norway - Sweden - Finland]",
                title_vi = "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
                duration_en = "2 days",
                duration_vi = "2 ngày",
                transport_en = "Bus",
                transport_vi = "Xe buýt",
                content_en = "`<p>Welcome to Northern Europe, a region of breathtaking landscapes, rich cultural heritage, and vibrant cities. From the majestic fjords of Norway to the enchanting forests of Finland, Northern Europe offers an unforgettable experience for travelers seeking adventure, tranquility, and discovery.</p>`",
                content_vi = "`<p>Chào mừng bạn đến Bắc Âu, một khu vực có phong cảnh ngoạn mục, di sản văn hóa phong phú và các thành phố sôi động. Từ những vịnh hẹp hùng vĩ của Na Uy đến những khu rừng mê hoặc của Phần Lan, Bắc Âu mang đến trải nghiệm khó quên cho những du khách đang tìm kiếm sự phiêu lưu, yên tĩnh và khám phá.</p>`",
                url = "/tour/nordic-travel-denmark-norway"
            },
            new Tour
            {
                Id = 2,
                title_en = "Central region tourism[Quang Binh - Nghe An - Ha Tinh]",
                title_vi = "Du lịch miền Trung[Quảng Bình- Nghệ An- Hà Tĩnh]",
                duration_en = "3 days",
                duration_vi = "3 ngày",
                transport_en = "Car",
                transport_vi = "Xe ô tô",
                content_en = "`<p>Quang Binh, Nghe An and Ha Tinh are three wonderful tourist destinations in Central Vietnam, famous for their wonderful natural landscapes and exceptional cultural and historical heritage.</p>`",
                content_vi = "`<p>Quảng Bình, Nghệ An và Hà Tĩnh là ba điểm đích du lịch tuyệt vời tại miền Trung Việt Nam, nổi tiếng với cảnh quan thiên nhiên tuyệt vời, di sản văn hóa và lịch sử đặc biệt.</p>`",
                url = "/tour/central-region-tourism-quang-binh-nghe-an-ha-tinh"
            }
            );
            modelBuilder.Entity<TourDestination>().HasData(
            new TourDestination
            {
                TourId = 1,
                DestinationId = 1
            },
            new TourDestination
            {
                TourId = 2,
                DestinationId = 3
            },
            new TourDestination
            {
                TourId = 2,
                DestinationId = 4
            });
            //tourDetail
            modelBuilder.Entity<TourDetail>().HasData(
            new TourDetail
            {
                Id = 1,
                departureDate = new DateTime(2024, 3, 24),
                tourCode = "TD001",
                adultPrice = 100.00f,
                childPrice = 50.00f,
                infantPrice = 0.00f,
                TourId = 1,
            },
            new TourDetail
            {
                Id = 2,
                departureDate = new DateTime(2024, 3, 25),
                tourCode = "TD002",
                adultPrice = 120.00f,
                childPrice = 60.00f,
                infantPrice = 0.00f,
                TourId = 1,
            },
            new TourDetail
            {
                Id = 3,
                departureDate = new DateTime(2024, 1, 15),
                tourCode = "TD003",
                adultPrice = 130.00f,
                childPrice = 50.00f,
                infantPrice = 0.00f,
                TourId = 2,
            }
            );

        }
    }
}
