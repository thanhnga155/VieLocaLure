using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class menuitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "menuItems",
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
                    table.PrimaryKey("PK_menuItems", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "menuItems",
                columns: new[] { "Id", "name_en", "name_vi", "url" },
                values: new object[,]
                {
                    { 1, "Homepage", "Trang chủ", "/" },
                    { 2, "Destination", "Điểm đến", "/destination" },
                    { 3, "Tour", "Tour du lịch", "/tour" },
                    { 4, "Contact", "Liên hệ", "/contact" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menuItems");
        }
    }
}
