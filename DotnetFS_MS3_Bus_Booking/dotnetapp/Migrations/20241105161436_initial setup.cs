using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetapp.Migrations
{
    public partial class initialsetup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Buses",
                columns: table => new
                {
                    bookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    busNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    routeSource = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    routeDestination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    passengerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bookingDate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buses", x => x.bookingId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Buses");
        }
    }
}
