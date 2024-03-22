using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class destinationDTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "destinationImages");

            migrationBuilder.AddColumn<int>(
                name: "DestinationId",
                table: "images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "tourImages",
                columns: table => new
                {
                    TourId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tourImages", x => new { x.TourId, x.ImageId });
                    table.ForeignKey(
                        name: "FK_tourImages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tourImages_tours_TourId",
                        column: x => x.TourId,
                        principalTable: "tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "destinations",
                columns: new[] { "Id", "ProvinceId", "name_en", "name_vi" },
                values: new object[] { 4, 1, "Ho Chi Minh Mausoleum", "Lăng Chủ Tịch Hồ Chí Minh" });

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 1,
                column: "DestinationId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 2,
                column: "DestinationId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 3,
                column: "DestinationId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "images",
                keyColumn: "Id",
                keyValue: 4,
                column: "DestinationId",
                value: 2);

            migrationBuilder.CreateIndex(
                name: "IX_images_DestinationId",
                table: "images",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_tourImages_ImageId",
                table: "tourImages",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_images_destinations_DestinationId",
                table: "images",
                column: "DestinationId",
                principalTable: "destinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_destinations_DestinationId",
                table: "images");

            migrationBuilder.DropTable(
                name: "tourImages");

            migrationBuilder.DropIndex(
                name: "IX_images_DestinationId",
                table: "images");

            migrationBuilder.DeleteData(
                table: "destinations",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "DestinationId",
                table: "images");

            migrationBuilder.CreateTable(
                name: "destinationImages",
                columns: table => new
                {
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_destinationImages", x => new { x.DestinationId, x.ImageId });
                    table.ForeignKey(
                        name: "FK_destinationImages_destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_destinationImages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_destinationImages_ImageId",
                table: "destinationImages",
                column: "ImageId");
        }
    }
}
