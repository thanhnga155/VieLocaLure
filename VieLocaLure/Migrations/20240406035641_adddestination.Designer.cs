﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VieLocaLure.Data;

#nullable disable

namespace VieLocaLure.Migrations
{
    [DbContext(typeof(VieLocaLureDB))]
    [Migration("20240406035641_adddestination")]
    partial class adddestination
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("VieLocaLure.Models.Accounts", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("gmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phone_number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("accounts");
                });

            modelBuilder.Entity("VieLocaLure.Models.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("areas");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            content = "`\r\n        <p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`",
                            name_en = "North Vietnam",
                            name_vi = "Miền Bắc",
                            url = "/destination/north-vietnam"
                        },
                        new
                        {
                            Id = 2,
                            content = "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`",
                            name_en = "Central Vietnam",
                            name_vi = "Miền Trung",
                            url = "/destination/central-vietnam"
                        },
                        new
                        {
                            Id = 3,
                            content = "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`",
                            name_en = "South Vietnam",
                            name_vi = "Miền Nam",
                            url = "/destination/south-vietnam"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Banner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("caption1_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("caption1_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("caption2_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("caption2_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("caption3_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("caption3_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("banners");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            caption1_en = "special value tour",
                            caption1_vi = "gói tour đặc biệt",
                            caption2_en = "panorama of vietnam",
                            caption2_vi = "toàn cảnh việt nam",
                            caption3_en = "Departing on Apr 5, 2024",
                            caption3_vi = "khởi hành 05/04/2024",
                            image = "/Uploads/vang-bong-mot-thoi.jpg",
                            url = "/tour/panorama-of-vietnam"
                        },
                        new
                        {
                            Id = 2,
                            caption1_en = "once upon an old time",
                            caption1_vi = "vang bóng một thời",
                            caption2_en = "Hue Historic Citadel",
                            caption2_vi = "Kinh thành Huế",
                            caption3_en = "Departing on Mar 20, 2024",
                            caption3_vi = "khởi hành 20/03/2024",
                            image = "/Uploads/kinh-thanh-hue.jpg",
                            url = "/tour/kinh-thanh-hue"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ProvinceId")
                        .HasColumnType("int");

                    b.Property<string>("name_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.ToTable("destinations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ProvinceId = 2,
                            name_en = "Landmark 81",
                            name_vi = "Tòa nhà Landmark 81"
                        },
                        new
                        {
                            Id = 2,
                            ProvinceId = 3,
                            name_en = "Phong Nha - Ke Bang",
                            name_vi = "Phong Nha - Kẻ Bàng"
                        },
                        new
                        {
                            Id = 3,
                            ProvinceId = 1,
                            name_en = "One Pillar pagoda",
                            name_vi = "Chùa Một Cột"
                        },
                        new
                        {
                            Id = 4,
                            ProvinceId = 1,
                            name_en = "Ho Chi Minh Mausoleum",
                            name_vi = "Lăng Chủ Tịch Hồ Chí Minh"
                        },
                        new
                        {
                            Id = 5,
                            ProvinceId = 3,
                            name_en = "Nhat Le Beach",
                            name_vi = "Biển Nhật Lệ"
                        },
                        new
                        {
                            Id = 6,
                            ProvinceId = 4,
                            name_en = "Hoa Lu ancient capital",
                            name_vi = "Cố đô Hoa Lư"
                        },
                        new
                        {
                            Id = 7,
                            ProvinceId = 4,
                            name_en = "Trang An scenic spot",
                            name_vi = "Danh thắng Tràng An"
                        },
                        new
                        {
                            Id = 8,
                            ProvinceId = 5,
                            name_en = "Cat Ba island",
                            name_vi = "Đảo Cát Bà"
                        },
                        new
                        {
                            Id = 9,
                            ProvinceId = 5,
                            name_en = "Do Son beach",
                            name_vi = "Bãi biển Đồ Sơn"
                        },
                        new
                        {
                            Id = 10,
                            ProvinceId = 6,
                            name_en = "Sapa",
                            name_vi = "Sapa"
                        },
                        new
                        {
                            Id = 11,
                            ProvinceId = 6,
                            name_en = "Co Tien mountain",
                            name_vi = "Núi cô Tiên"
                        },
                        new
                        {
                            Id = 12,
                            ProvinceId = 7,
                            name_en = "Hue Citadel - Imperial Citadel",
                            name_vi = "Kinh Thành Huế- Đại Nội"
                        },
                        new
                        {
                            Id = 13,
                            ProvinceId = 7,
                            name_en = "Huong river",
                            name_vi = "Sông Hương"
                        },
                        new
                        {
                            Id = 14,
                            ProvinceId = 7,
                            name_en = "Thiên Mụ pagoda",
                            name_vi = "Chùa Thiên Mụ"
                        },
                        new
                        {
                            Id = 15,
                            ProvinceId = 8,
                            name_en = "Hon Chong Hon Vo Nha Trang",
                            name_vi = "Hòn Chồng Hòn Vợ Nha Trang"
                        },
                        new
                        {
                            Id = 16,
                            ProvinceId = 8,
                            name_en = "Thap Ba Ponagar",
                            name_vi = "Tháp Bà"
                        },
                        new
                        {
                            Id = 17,
                            ProvinceId = 9,
                            name_en = "Ho Tram",
                            name_vi = "Hồ Tràm"
                        },
                        new
                        {
                            Id = 18,
                            ProvinceId = 9,
                            name_en = "Vung Tau beach",
                            name_vi = "Bãi biển Vũng Tàu"
                        },
                        new
                        {
                            Id = 19,
                            ProvinceId = 10,
                            name_en = "Phu Quoc island",
                            name_vi = "Đảo Phú Quốc"
                        },
                        new
                        {
                            Id = 20,
                            ProvinceId = 10,
                            name_en = "U Minh Thuong National Park",
                            name_vi = "Vườn quốc gia U Minh Thượng"
                        },
                        new
                        {
                            Id = 21,
                            ProvinceId = 11,
                            name_en = "Ca Mau floating market",
                            name_vi = "Chợ nổi Cà Mau"
                        },
                        new
                        {
                            Id = 22,
                            ProvinceId = 11,
                            name_en = "Ca Mau mangrove forest",
                            name_vi = "Rừng ngập mặn Cà Mau"
                        },
                        new
                        {
                            Id = 23,
                            ProvinceId = 12,
                            name_en = "Phu Da Island",
                            name_vi = "Cồn Phú Đa"
                        },
                        new
                        {
                            Id = 24,
                            ProvinceId = 12,
                            name_en = "Bach Van Pagoda",
                            name_vi = "Chùa Bạch Vân"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.ToTable("images");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DestinationId = 4,
                            url = "/Uploads/lang-chu-tich-HCM.jpg"
                        },
                        new
                        {
                            Id = 2,
                            DestinationId = 3,
                            url = "/Uploads/canh-thanh-pho-HCM.jpg"
                        },
                        new
                        {
                            Id = 3,
                            DestinationId = 1,
                            url = "/Uploads/landmark81.jpeg"
                        },
                        new
                        {
                            Id = 4,
                            DestinationId = 2,
                            url = "/Uploads/dong-phong-nha-ke-bang.jpg"
                        },
                        new
                        {
                            Id = 5,
                            DestinationId = 2,
                            url = "/Uploads/phong-nha-ke-bang-2.jpg"
                        },
                        new
                        {
                            Id = 6,
                            DestinationId = 4,
                            url = "/Uploads/lang-bac-ho.jpg"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.MenuItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("level")
                        .HasColumnType("int");

                    b.Property<string>("name_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("menuItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            level = 1,
                            name_en = "Homepage",
                            name_vi = "Trang chủ",
                            url = "/"
                        },
                        new
                        {
                            Id = 2,
                            level = 1,
                            name_en = "Destination",
                            name_vi = "Điểm đến",
                            url = "/destination"
                        },
                        new
                        {
                            Id = 3,
                            level = 1,
                            name_en = "Tour",
                            name_vi = "Tour du lịch",
                            url = "/tour"
                        },
                        new
                        {
                            Id = 4,
                            level = 1,
                            name_en = "Contact",
                            name_vi = "Liên hệ",
                            url = "/contact"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AreaId")
                        .HasColumnType("int");

                    b.Property<string>("name_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.ToTable("provinces");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AreaId = 1,
                            name_en = "Ha Noi",
                            name_vi = "Hà Nội"
                        },
                        new
                        {
                            Id = 2,
                            AreaId = 3,
                            name_en = "Ho Chi Minh City",
                            name_vi = "Thành phố Hồ Chí Minh"
                        },
                        new
                        {
                            Id = 3,
                            AreaId = 2,
                            name_en = "Quang Binh",
                            name_vi = "Quảng Bình"
                        },
                        new
                        {
                            Id = 4,
                            AreaId = 1,
                            name_en = "Ninh Binh",
                            name_vi = "Ninh Bình"
                        },
                        new
                        {
                            Id = 5,
                            AreaId = 1,
                            name_en = "Hai Phong",
                            name_vi = "Hải Phòng"
                        },
                        new
                        {
                            Id = 6,
                            AreaId = 1,
                            name_en = "Lao Cai",
                            name_vi = "Lào Cai"
                        },
                        new
                        {
                            Id = 7,
                            AreaId = 2,
                            name_en = "Hue",
                            name_vi = "Huế"
                        },
                        new
                        {
                            Id = 8,
                            AreaId = 2,
                            name_en = "Khanh Hoa",
                            name_vi = "Khánh Hòa"
                        },
                        new
                        {
                            Id = 9,
                            AreaId = 3,
                            name_en = "Vung Tau",
                            name_vi = "Vũng Tàu"
                        },
                        new
                        {
                            Id = 10,
                            AreaId = 3,
                            name_en = "Kien Giang",
                            name_vi = "Kiên Giang"
                        },
                        new
                        {
                            Id = 11,
                            AreaId = 3,
                            name_en = "Ca Mau",
                            name_vi = "Cà Mau"
                        },
                        new
                        {
                            Id = 12,
                            AreaId = 3,
                            name_en = "Ben Tre",
                            name_vi = "Bến Tre"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Tour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("content_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("content_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("duration_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("duration_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("transport_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("transport_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tours");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            content_en = "`<p>Welcome to Northern Europe, a region of breathtaking landscapes, rich cultural heritage, and vibrant cities. From the majestic fjords of Norway to the enchanting forests of Finland, Northern Europe offers an unforgettable experience for travelers seeking adventure, tranquility, and discovery.</p>`",
                            content_vi = "`<p>Chào mừng bạn đến Bắc Âu, một khu vực có phong cảnh ngoạn mục, di sản văn hóa phong phú và các thành phố sôi động. Từ những vịnh hẹp hùng vĩ của Na Uy đến những khu rừng mê hoặc của Phần Lan, Bắc Âu mang đến trải nghiệm khó quên cho những du khách đang tìm kiếm sự phiêu lưu, yên tĩnh và khám phá.</p>`",
                            duration_en = "2 days",
                            duration_vi = "2 ngày",
                            title_en = "Nordic Travel [Denmark - Norway - Sweden - Finland]",
                            title_vi = "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
                            transport_en = "Bus",
                            transport_vi = "Xe buýt",
                            url = "/tour/nordic-travel-denmark-norway"
                        },
                        new
                        {
                            Id = 2,
                            content_en = "`<p>Quang Binh, Nghe An and Ha Tinh are three wonderful tourist destinations in Central Vietnam, famous for their wonderful natural landscapes and exceptional cultural and historical heritage.</p>`",
                            content_vi = "`<p>Quảng Bình, Nghệ An và Hà Tĩnh là ba điểm đích du lịch tuyệt vời tại miền Trung Việt Nam, nổi tiếng với cảnh quan thiên nhiên tuyệt vời, di sản văn hóa và lịch sử đặc biệt.</p>`",
                            duration_en = "3 days",
                            duration_vi = "3 ngày",
                            title_en = "Central region tourism[Quang Binh - Nghe An - Ha Tinh]",
                            title_vi = "Du lịch miền Trung[Quảng Bình- Nghệ An- Hà Tĩnh]",
                            transport_en = "Car",
                            transport_vi = "Xe ô tô",
                            url = "/tour/central-region-tourism-quang-binh-nghe-an-ha-tinh"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.TourDestination", b =>
                {
                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.HasKey("TourId", "DestinationId");

                    b.HasIndex("DestinationId");

                    b.ToTable("tourDestinations");

                    b.HasData(
                        new
                        {
                            TourId = 1,
                            DestinationId = 1
                        },
                        new
                        {
                            TourId = 2,
                            DestinationId = 3
                        },
                        new
                        {
                            TourId = 2,
                            DestinationId = 4
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.TourDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.Property<float>("adultPrice")
                        .HasColumnType("real");

                    b.Property<float>("childPrice")
                        .HasColumnType("real");

                    b.Property<DateTime>("departureDate")
                        .HasColumnType("datetime2");

                    b.Property<float>("infantPrice")
                        .HasColumnType("real");

                    b.Property<string>("tourCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TourId");

                    b.ToTable("tourDetails");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            TourId = 1,
                            adultPrice = 100f,
                            childPrice = 50f,
                            departureDate = new DateTime(2024, 3, 24, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            infantPrice = 0f,
                            tourCode = "TD001"
                        },
                        new
                        {
                            Id = 2,
                            TourId = 1,
                            adultPrice = 120f,
                            childPrice = 60f,
                            departureDate = new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            infantPrice = 0f,
                            tourCode = "TD002"
                        },
                        new
                        {
                            Id = 3,
                            TourId = 2,
                            adultPrice = 130f,
                            childPrice = 50f,
                            departureDate = new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            infantPrice = 0f,
                            tourCode = "TD003"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Destination", b =>
                {
                    b.HasOne("VieLocaLure.Models.Province", "Province")
                        .WithMany("Destination")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Province");
                });

            modelBuilder.Entity("VieLocaLure.Models.Image", b =>
                {
                    b.HasOne("VieLocaLure.Models.Destination", "Destination")
                        .WithMany("Image")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");
                });

            modelBuilder.Entity("VieLocaLure.Models.Province", b =>
                {
                    b.HasOne("VieLocaLure.Models.Area", "Area")
                        .WithMany("Province")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");
                });

            modelBuilder.Entity("VieLocaLure.Models.TourDestination", b =>
                {
                    b.HasOne("VieLocaLure.Models.Destination", "Destination")
                        .WithMany("TourDestination")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VieLocaLure.Models.Tour", "Tour")
                        .WithMany("TourDestination")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("VieLocaLure.Models.TourDetail", b =>
                {
                    b.HasOne("VieLocaLure.Models.Tour", "Tour")
                        .WithMany("TourDetail")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("VieLocaLure.Models.Area", b =>
                {
                    b.Navigation("Province");
                });

            modelBuilder.Entity("VieLocaLure.Models.Destination", b =>
                {
                    b.Navigation("Image");

                    b.Navigation("TourDestination");
                });

            modelBuilder.Entity("VieLocaLure.Models.Province", b =>
                {
                    b.Navigation("Destination");
                });

            modelBuilder.Entity("VieLocaLure.Models.Tour", b =>
                {
                    b.Navigation("TourDestination");

                    b.Navigation("TourDetail");
                });
#pragma warning restore 612, 618
        }
    }
}
