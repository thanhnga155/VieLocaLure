using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class dataprovince : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "provinces",
                columns: new[] { "Id", "AreaId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 1, 1, "Ha Noi", "Hà Nội" },
                    { 2, 3, "Ho Chi Minh City", "Thành phố Hồ Chí Minh" },
                    { 3, 2, "Quang Binh", "Quảng Bình" },
                    { 4, 1, "Ha Noi", "Hà Nội" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
