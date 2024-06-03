using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VieLocaLure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "areas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_areas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    caption1_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption2_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption3_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption1_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption2_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption3_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_banners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "menuItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    level = table.Column<int>(type: "int", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menuItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    title_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    duration_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    duration_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transport_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transport_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tours", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AreaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_provinces_areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "invoiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    count_adult = table.Column<int>(type: "int", nullable: false),
                    count_child = table.Column<int>(type: "int", nullable: false),
                    count_infant = table.Column<int>(type: "int", nullable: false),
                    payment_method = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    totalPrice = table.Column<float>(type: "real", nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_invoiceDetails_accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_invoiceDetails_tours_TourId",
                        column: x => x.TourId,
                        principalTable: "tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tourDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    departureDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    tourCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adultPrice = table.Column<float>(type: "real", nullable: false),
                    childPrice = table.Column<float>(type: "real", nullable: false),
                    infantPrice = table.Column<float>(type: "real", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tourDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tourDetails_tours_TourId",
                        column: x => x.TourId,
                        principalTable: "tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "destinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name_vi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProvinceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_destinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_destinations_provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "invoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    amount = table.Column<float>(type: "real", nullable: false),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    payment_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvoiceDetailId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_invoices_invoiceDetails_InvoiceDetailId",
                        column: x => x.InvoiceDetailId,
                        principalTable: "invoiceDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_images_destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tourDestinations",
                columns: table => new
                {
                    TourId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tourDestinations", x => new { x.TourId, x.DestinationId });
                    table.ForeignKey(
                        name: "FK_tourDestinations_destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tourDestinations_tours_TourId",
                        column: x => x.TourId,
                        principalTable: "tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "areas",
                columns: new[] { "Id", "content", "name_en", "name_vi", "url" },
                values: new object[,]
                {
                    { 1, "`\r\n        <p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`", "North Vietnam", "Miền Bắc", "/destination/north-vietnam" },
                    { 2, "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`", "Central Vietnam", "Miền Trung", "/destination/central-vietnam" },
                    { 3, "`<p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>\r\n\r\n        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>\r\n\r\n        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>\r\n\r\n        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>`", "South Vietnam", "Miền Nam", "/destination/south-vietnam" }
                });

            migrationBuilder.InsertData(
                table: "banners",
                columns: new[] { "Id", "caption1_en", "caption1_vi", "caption2_en", "caption2_vi", "caption3_en", "caption3_vi", "image", "url" },
                values: new object[,]
                {
                    { 1, "special value tour", "gói tour đặc biệt", "panorama of vietnam", "toàn cảnh việt nam", "Departing on Apr 5, 2024", "khởi hành 05/04/2024", "/Uploads/vang-bong-mot-thoi.jpg", "/tour/panorama-of-vietnam" },
                    { 2, "once upon an old time", "vang bóng một thời", "Hue Historic Citadel", "Kinh thành Huế", "Departing on Mar 20, 2024", "khởi hành 20/03/2024", "/Uploads/kinh-thanh-hue.jpg", "/tour/kinh-thanh-hue" }
                });

            migrationBuilder.InsertData(
                table: "menuItems",
                columns: new[] { "Id", "level", "name_en", "name_vi", "url" },
                values: new object[,]
                {
                    { 1, 1, "Homepage", "Trang chủ", "/" },
                    { 2, 1, "Destination", "Điểm đến", "/destination" },
                    { 3, 1, "Tour", "Tour du lịch", "/tour" },
                    { 4, 1, "Contact", "Liên hệ", "/contact" }
                });

            migrationBuilder.InsertData(
                table: "tours",
                columns: new[] { "Id", "content_en", "content_vi", "duration_en", "duration_vi", "title_en", "title_vi", "transport_en", "transport_vi", "url" },
                values: new object[,]
                {
                    { 1, "`<p>Welcome to Northern Europe, a region of breathtaking landscapes, rich cultural heritage, and vibrant cities. From the majestic fjords of Norway to the enchanting forests of Finland, Northern Europe offers an unforgettable experience for travelers seeking adventure, tranquility, and discovery.</p>`", "`<p>Chào mừng bạn đến Bắc Âu, một khu vực có phong cảnh ngoạn mục, di sản văn hóa phong phú và các thành phố sôi động. Từ những vịnh hẹp hùng vĩ của Na Uy đến những khu rừng mê hoặc của Phần Lan, Bắc Âu mang đến trải nghiệm khó quên cho những du khách đang tìm kiếm sự phiêu lưu, yên tĩnh và khám phá.</p>`", "2 days", "2 ngày", "Nordic Travel [Denmark - Norway - Sweden - Finland]", "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]", "Bus", "Xe buýt", "/tour/nordic-travel-denmark-norway" },
                    { 2, "`<p>Quang Binh, Nghe An and Ha Tinh are three wonderful tourist destinations in Central Vietnam, famous for their wonderful natural landscapes and exceptional cultural and historical heritage.</p>`", "`<p>Quảng Bình, Nghệ An và Hà Tĩnh là ba điểm đích du lịch tuyệt vời tại miền Trung Việt Nam, nổi tiếng với cảnh quan thiên nhiên tuyệt vời, di sản văn hóa và lịch sử đặc biệt.</p>`", "3 days", "3 ngày", "Central region tourism[Quang Binh - Nghe An - Ha Tinh]", "Du lịch miền Trung[Quảng Bình- Nghệ An- Hà Tĩnh]", "Car", "Xe ô tô", "/tour/central-region-tourism-quang-binh-nghe-an-ha-tinh" }
                });

            migrationBuilder.InsertData(
                table: "provinces",
                columns: new[] { "Id", "AreaId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 1, 1, "Ha Noi", "Hà Nội" },
                    { 2, 3, "Ho Chi Minh City", "Thành phố Hồ Chí Minh" },
                    { 3, 2, "Quang Binh", "Quảng Bình" },
                    { 4, 1, "Ninh Binh", "Ninh Bình" },
                    { 5, 1, "Hai Phong", "Hải Phòng" },
                    { 6, 1, "Lao Cai", "Lào Cai" },
                    { 7, 2, "Hue", "Huế" },
                    { 8, 2, "Khanh Hoa", "Khánh Hòa" },
                    { 9, 3, "Vung Tau", "Vũng Tàu" },
                    { 10, 3, "Kien Giang", "Kiên Giang" },
                    { 11, 3, "Ca Mau", "Cà Mau" },
                    { 12, 3, "Ben Tre", "Bến Tre" }
                });

            migrationBuilder.InsertData(
                table: "tourDetails",
                columns: new[] { "Id", "TourId", "adultPrice", "childPrice", "departureDate", "infantPrice", "tourCode" },
                values: new object[,]
                {
                    { 1, 1, 100f, 50f, new DateTime(2024, 3, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 0f, "TD001" },
                    { 2, 1, 120f, 60f, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 0f, "TD002" },
                    { 3, 2, 130f, 50f, new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 0f, "TD003" }
                });

            migrationBuilder.InsertData(
                table: "destinations",
                columns: new[] { "Id", "ProvinceId", "name_en", "name_vi" },
                values: new object[,]
                {
                    { 1, 2, "Landmark 81", "Tòa nhà Landmark 81" },
                    { 2, 3, "Phong Nha - Ke Bang", "Phong Nha - Kẻ Bàng" },
                    { 3, 1, "One Pillar pagoda", "Chùa Một Cột" },
                    { 4, 1, "Ho Chi Minh Mausoleum", "Lăng Chủ Tịch Hồ Chí Minh" },
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

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "DestinationId", "url" },
                values: new object[,]
                {
                    { 1, 4, "/Uploads/lang-chu-tich-HCM.jpg" },
                    { 2, 3, "/Uploads/canh-thanh-pho-HCM.jpg" },
                    { 3, 1, "/Uploads/landmark81.jpeg" },
                    { 4, 2, "/Uploads/dong-phong-nha-ke-bang.jpg" },
                    { 5, 2, "/Uploads/phong-nha-ke-bang-2.jpg" },
                    { 6, 4, "/Uploads/lang-bac-ho.jpg" }
                });

            migrationBuilder.InsertData(
                table: "tourDestinations",
                columns: new[] { "DestinationId", "TourId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 3, 2 },
                    { 4, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_destinations_ProvinceId",
                table: "destinations",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_images_DestinationId",
                table: "images",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_invoiceDetails_AccountId",
                table: "invoiceDetails",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_invoiceDetails_TourId",
                table: "invoiceDetails",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_invoices_InvoiceDetailId",
                table: "invoices",
                column: "InvoiceDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_provinces_AreaId",
                table: "provinces",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_tourDestinations_DestinationId",
                table: "tourDestinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_tourDetails_TourId",
                table: "tourDetails",
                column: "TourId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "banners");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropTable(
                name: "invoices");

            migrationBuilder.DropTable(
                name: "menuItems");

            migrationBuilder.DropTable(
                name: "tourDestinations");

            migrationBuilder.DropTable(
                name: "tourDetails");

            migrationBuilder.DropTable(
                name: "invoiceDetails");

            migrationBuilder.DropTable(
                name: "destinations");

            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropTable(
                name: "tours");

            migrationBuilder.DropTable(
                name: "provinces");

            migrationBuilder.DropTable(
                name: "areas");
        }
    }
}
