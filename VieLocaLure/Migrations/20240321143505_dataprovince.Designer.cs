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
    [Migration("20240321143505_dataprovince")]
    partial class dataprovince
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

                    b.Property<string>("name_en")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name_vi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("destinations");
                });

            modelBuilder.Entity("VieLocaLure.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("images");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            url = "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg"
                        },
                        new
                        {
                            Id = 2,
                            url = "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg"
                        },
                        new
                        {
                            Id = 3,
                            url = "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg"
                        },
                        new
                        {
                            Id = 4,
                            url = "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg"
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

            modelBuilder.Entity("VieLocaLure.Models.Province", b =>
                {
                    b.HasOne("VieLocaLure.Models.Area", "Area")
                        .WithMany("Province")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");
                });

            modelBuilder.Entity("VieLocaLure.Models.Area", b =>
                {
                    b.Navigation("Province");
                });
#pragma warning restore 612, 618
        }
    }
}
