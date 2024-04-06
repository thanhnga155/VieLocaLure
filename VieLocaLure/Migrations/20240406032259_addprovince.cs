using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class addprovince : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_editable",
                table: "menuItems");

            migrationBuilder.InsertData(
                table: "provinces",
                columns: new[] { "Id", "AreaId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 5, 1, "Hai Phong", "Hải Phòng" },
                    { 6, 1, "Lao Cai", "Lào Cai" },
                    { 7, 2, "Hue", "Huế" },
                    { 8, 2, "Khanh Hoa", "Khánh Hòa" },
                    { 9, 3, "Vung Tau", "Vũng Tàu" },
                    { 10, 3, "Kien Giang", "Kiên Giang" },
                    { 11, 3, "Ca Mau", "Cà Mau" },
                    { 12, 3, "Ben Tre", "Bến Tre" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "provinces",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.AddColumn<bool>(
                name: "is_editable",
                table: "menuItems",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "is_editable",
                value: false);

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "is_editable",
                value: false);

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "is_editable",
                value: false);

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "is_editable",
                value: false);
        }
    }
}
