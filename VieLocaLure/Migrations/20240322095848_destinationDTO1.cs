using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class destinationDTO1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "url",
                value: "https://hochiminh.vn/Uploads/Images/2022/11/14/6/ttxvnlangc-1589207452-48.jpg");

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "DestinationId", "url" },
                values: new object[,]
                {
                    { 5, 2, "https://cdn.tgdd.vn/Files/2021/07/05/1365760/kinh-nghiem-du-lich-kham-pha-dong-phong-nha-ke-bang-quang-binh-202107051210588725.jpg" },
                    { 6, 4, "https://bizweb.dktcdn.net/100/366/377/files/lang-bac-ho.jpg?v=1699677034595" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "url",
                value: "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg");
        }
    }
}
