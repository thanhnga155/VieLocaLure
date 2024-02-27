using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "banners",
                columns: new[] { "Id", "caption1_en", "caption1_vi", "caption2_en", "caption2_vi", "caption3_en", "caption3_vi", "tour_id", "url" },
                values: new object[,]
                {
                    { 1, "special value tour", "gói tour đặc biệt", "panorama of vietnam", "toàn cảnh việt nam", "Departing on Apr 5, 2024", "khởi hành 05/04/2024", 0, "https://zoomtravel.vn/upload/images/samten-hills-0.jpg" },
                    { 2, "once upon an old time", "vang bóng một thời", "Hue Historic Citadel", "Kinh thành Huế", "Departing on Mar 20, 2024", "khởi hành 20/03/2024", 0, "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
