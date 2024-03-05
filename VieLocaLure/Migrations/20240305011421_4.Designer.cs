﻿// <auto-generated />
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
    [Migration("20240305011421_4")]
    partial class _4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

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

                    b.Property<int>("tour_id")
                        .HasColumnType("int");

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
                            image = "https://zoomtravel.vn/upload/images/samten-hills-0.jpg",
                            tour_id = 0
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
                            image = "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg",
                            tour_id = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
