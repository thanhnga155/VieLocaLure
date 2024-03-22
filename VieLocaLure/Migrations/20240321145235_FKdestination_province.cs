using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class FKdestination_province : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                table: "destinations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_destinations_ProvinceId",
                table: "destinations",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_destinations_provinces_ProvinceId",
                table: "destinations",
                column: "ProvinceId",
                principalTable: "provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_destinations_provinces_ProvinceId",
                table: "destinations");

            migrationBuilder.DropIndex(
                name: "IX_destinations_ProvinceId",
                table: "destinations");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "destinations");
        }
    }
}
