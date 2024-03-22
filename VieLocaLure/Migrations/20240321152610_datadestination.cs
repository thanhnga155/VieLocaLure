using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class datadestination : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "destinations",
                columns: new[] { "Id", "ProvinceId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 1, 2, "Landmark 81", "Tòa nhà Landmark 81" },
                    { 2, 3, "Phong Nha - Ke Bang", "Phong Nha - Kẻ Bàng" },
                    { 3, 1, "One Pillar pagoda", "Chùa Một Cột" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
