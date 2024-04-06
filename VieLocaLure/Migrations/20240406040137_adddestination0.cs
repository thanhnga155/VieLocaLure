using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class adddestination0 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 24);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "destinations",
                columns: new[] { "Id", "ProvinceId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 5, 3, "Nhat Le Beach", "Biển Nhật Lệ" },
                    { 6, 4, "Hoa Lu ancient capital", "Cố đô Hoa Lư" },
                    { 7, 4, "Trang An scenic spot", "Danh thắng Tràng An" },
                    { 8, 5, "Cat Ba island", "Đảo Cát Bà" },
                    { 9, 5, "Do Son beach", "Bãi biển Đồ Sơn" },
                    { 10, 6, "Sapa", "Sapa" },
                    { 11, 6, "Co Tien mountain", "Núi cô Tiên" },
                    { 12, 7, "Hue Citadel - Imperial Citadel", "Kinh Thành Huế- Đại Nội" },
                    { 13, 7, "Huong river", "Sông Hương" },
                    { 14, 7, "Thiên Mụ pagoda", "Chùa Thiên Mụ" },
                    { 15, 8, "Hon Chong Hon Vo Nha Trang", "Hòn Chồng Hòn Vợ Nha Trang" },
                    { 16, 8, "Thap Ba Ponagar", "Tháp Bà" },
                    { 17, 9, "Ho Tram", "Hồ Tràm" },
                    { 18, 9, "Vung Tau beach", "Bãi biển Vũng Tàu" },
                    { 19, 10, "Phu Quoc island", "Đảo Phú Quốc" },
                    { 20, 10, "U Minh Thuong National Park", "Vườn quốc gia U Minh Thượng" },
                    { 21, 11, "Ca Mau floating market", "Chợ nổi Cà Mau" },
                    { 22, 11, "Ca Mau mangrove forest", "Rừng ngập mặn Cà Mau" },
                    { 23, 12, "Phu Da Island", "Cồn Phú Đa" },
                    { 24, 12, "Bach Van Pagoda", "Chùa Bạch Vân" }
                });
        }
    }
}
