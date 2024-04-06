using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class iseditable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_editable",
                table: "menuItems",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "level",
                table: "menuItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "is_editable", "level" },
                values: new object[] { false, 1 });

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "is_editable", "level" },
                values: new object[] { false, 1 });

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "is_editable", "level" },
                values: new object[] { false, 1 });

            migrationBuilder.UpdateData(
                table: "menuItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "is_editable", "level" },
                values: new object[] { false, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_editable",
                table: "menuItems");

            migrationBuilder.DropColumn(
                name: "level",
                table: "menuItems");
        }
    }
}
