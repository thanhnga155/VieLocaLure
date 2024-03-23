using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class uploads : Migration
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
                value: "https://zoomtravel.vn/upload/images/samten-hills-0.jpg");

            migrationBuilder.UpdateData(
                table: "banners",
                keyColumn: "Id",
                keyValue: 2,
                column: "image",
                value: "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "url",
                value: "https://hochiminh.vn/Uploads/Images/2022/11/14/6/ttxvnlangc-1589207452-48.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 2,
                column: "url",
                value: "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 3,
                column: "url",
                value: "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 4,
                column: "url",
                value: "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 5,
                column: "url",
                value: "https://cdn.tgdd.vn/Files/2021/07/05/1365760/kinh-nghiem-du-lich-kham-pha-dong-phong-nha-ke-bang-quang-binh-202107051210588725.jpg");

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 6,
                column: "url",
                value: "https://bizweb.dktcdn.net/100/366/377/files/lang-bac-ho.jpg?v=1699677034595");
        }
    }
}
