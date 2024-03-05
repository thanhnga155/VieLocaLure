using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class _6 : Migration
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
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_areas", x => x.Id);
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
                name: "provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id_area = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_provinces_areas_Id_area",
                        column: x => x.Id_area,
                        principalTable: "areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id_image = table.Column<int>(type: "int", nullable: false),
                    Id_province = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_locations_images_Id_image",
                        column: x => x.Id_image,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_locations_provinces_Id_province",
                        column: x => x.Id_province,
                        principalTable: "provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_day = table.Column<DateTime>(type: "datetime2", nullable: false),
                    end_day = table.Column<DateTime>(type: "datetime2", nullable: false),
                    tour_time = table.Column<int>(type: "int", nullable: false),
                    tour_price = table.Column<double>(type: "float", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    Id_location = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tours_locations_Id_location",
                        column: x => x.Id_location,
                        principalTable: "locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_locations_Id_image",
                table: "locations",
                column: "Id_image");

            migrationBuilder.CreateIndex(
                name: "IX_locations_Id_province",
                table: "locations",
                column: "Id_province");

            migrationBuilder.CreateIndex(
                name: "IX_provinces_Id_area",
                table: "provinces",
                column: "Id_area");

            migrationBuilder.CreateIndex(
                name: "IX_tours_Id_location",
                table: "tours",
                column: "Id_location");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropTable(
                name: "tours");

            migrationBuilder.DropTable(
                name: "locations");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropTable(
                name: "provinces");

            migrationBuilder.DropTable(
                name: "areas");
        }
    }
}
