using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "areas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_areas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    caption1_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption2_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption3_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption1_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption2_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption3_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_banners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "destinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_destinations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tourDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    departureDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    tourCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adultPrice = table.Column<float>(type: "real", nullable: false),
                    childPrice = table.Column<float>(type: "real", nullable: false),
                    infantPrice = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tourDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    title_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    duration_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    duration_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transport_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transport_vi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tours", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AreaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_provinces_areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "areas",
                columns: new[] { "Id", "name_en", "name_vi", "url" },
                values: new object[,]
                {
                    { 1, "North Vietnam", "Miền Bắc", "/destination/north-vietnam" },
                    { 2, "Central Vietnam", "Miền Trung", "/destination/central-vietnam" },
                    { 3, "South Vietnam", "Miền Nam", "/destination/south-vietnam" }
                });

            migrationBuilder.InsertData(
                table: "banners",
                columns: new[] { "Id", "caption1_en", "caption1_vi", "caption2_en", "caption2_vi", "caption3_en", "caption3_vi", "image" },
                values: new object[,]
                {
                    { 1, "special value tour", "gói tour đặc biệt", "panorama of vietnam", "toàn cảnh việt nam", "Departing on Apr 5, 2024", "khởi hành 05/04/2024", "https://zoomtravel.vn/upload/images/samten-hills-0.jpg" },
                    { 2, "once upon an old time", "vang bóng một thời", "Hue Historic Citadel", "Kinh thành Huế", "Departing on Mar 20, 2024", "khởi hành 20/03/2024", "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg" }
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "url" },
                values: new object[,]
                {
                    { 1, "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg" },
                    { 2, "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg" },
                    { 3, "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg" },
                    { 4, "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_provinces_AreaId",
                table: "provinces",
                column: "AreaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropTable(
                name: "banners");

            migrationBuilder.DropTable(
                name: "destinations");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropTable(
                name: "provinces");

            migrationBuilder.DropTable(
                name: "tourDetails");

            migrationBuilder.DropTable(
                name: "tours");

            migrationBuilder.DropTable(
                name: "areas");
        }
    }
}
