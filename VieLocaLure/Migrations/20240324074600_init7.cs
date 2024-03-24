using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 1,
                column: "image",
                value: "/Uploads/vang-bong-mot-thoi.jpg");

            migrationBuilder.UpdateData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 2,
                column: "image",
                value: "/Uploads/kinh-thanh-hue.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "url",
                value: "/Uploads/lang-chu-tich-HCM.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 2,
                column: "url",
                value: "/Uploads/canh-thanh-pho-HCM.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 3,
                column: "url",
                value: "/Uploads/landmark81.jpeg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 4,
                column: "url",
                value: "/Uploads/dong-phong-nha-ke-bang.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 5,
                column: "url",
                value: "/Uploads/phong-nha-ke-bang-2.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 6,
                column: "url",
                value: "/Uploads/lang-bac-ho.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 1,
                column: "image",
                value: "/client/src/uploads/vang-bong-mot-thoi.jpg");

            migrationBuilder.UpdateData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 2,
                column: "image",
                value: "/client/src/uploads/kinh-thanh-hue.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "url",
                value: "/client/src/uploads/lang-chu-tich-HCM.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 2,
                column: "url",
                value: "/client/src/uploads/canh-thanh-pho-HCM.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 3,
                column: "url",
                value: "/client/src/uploads/landmark81.jpeg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 4,
                column: "url",
                value: "/client/src/uploads/dong-phong-nha-ke-bang.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 5,
                column: "url",
                value: "/client/src/uploads/phong-nha-ke-bang-2.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 6,
                column: "url",
                value: "/client/src/uploads/lang-bac-ho.jpg");
        }
    }
}
