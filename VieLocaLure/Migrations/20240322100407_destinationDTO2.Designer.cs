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
    [Migration("20240322100407_destinationDTO2")]
    partial class destinationDTO2
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
                            name_en = "North Vietnam",
                            name_vi = "Miền Bắc",
                            url = "/destination/north-vietnam"
                        },
                        new
                        {
                            Id = 2,
                            name_en = "Central Vietnam",
                            name_vi = "Miền Trung",
                            url = "/destination/central-vietnam"
                        },
                        new
                        {
                            Id = 3,
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
                            image = "https://zoomtravel.vn/upload/images/samten-hills-0.jpg"
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
                            image = "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg"
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
                            url = "https://hochiminh.vn/Uploads/Images/2022/11/14/6/ttxvnlangc-1589207452-48.jpg"
                        },
                        new
                        {
                            Id = 2,
                            DestinationId = 3,
                            url = "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg"
                        },
                        new
                        {
                            Id = 3,
                            DestinationId = 1,
                            url = "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg"
                        },
                        new
                        {
                            Id = 4,
                            DestinationId = 2,
                            url = "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg"
                        },
                        new
                        {
                            Id = 5,
                            DestinationId = 2,
                            url = "https://cdn.tgdd.vn/Files/2021/07/05/1365760/kinh-nghiem-du-lich-kham-pha-dong-phong-nha-ke-bang-quang-binh-202107051210588725.jpg"
                        },
                        new
                        {
                            Id = 6,
                            DestinationId = 4,
                            url = "https://bizweb.dktcdn.net/100/366/377/files/lang-bac-ho.jpg?v=1699677034595"
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
                            name_en = "Ha Noi",
                            name_vi = "Hà Nội"
                        });
                });

            modelBuilder.Entity("VieLocaLure.Models.Tour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

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

                    b.HasKey("Id");

                    b.ToTable("tours");
                });

            modelBuilder.Entity("VieLocaLure.Models.TourDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

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

                    b.ToTable("tourDetails");
                });

            modelBuilder.Entity("VieLocaLure.Models.TourImage", b =>
                {
                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.Property<int>("ImageId")
                        .HasColumnType("int");

                    b.HasKey("TourId", "ImageId");

                    b.HasIndex("ImageId");

                    b.ToTable("tourImages");
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

            modelBuilder.Entity("VieLocaLure.Models.TourImage", b =>
                {
                    b.HasOne("VieLocaLure.Models.Image", "Image")
                        .WithMany("TourImage")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VieLocaLure.Models.Tour", "Tour")
                        .WithMany()
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("VieLocaLure.Models.Area", b =>
                {
                    b.Navigation("Province");
                });

            modelBuilder.Entity("VieLocaLure.Models.Destination", b =>
                {
                    b.Navigation("Image");
                });

            modelBuilder.Entity("VieLocaLure.Models.Image", b =>
                {
                    b.Navigation("TourImage");
                });

            modelBuilder.Entity("VieLocaLure.Models.Province", b =>
                {
                    b.Navigation("Destination");
                });
#pragma warning restore 612, 618
        }
    }
}