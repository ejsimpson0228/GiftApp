using Microsoft.EntityFrameworkCore.Migrations;

namespace GiftAppWebAPI.Migrations
{
    public partial class removed_exception : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Exception",
                table: "Logs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Exception",
                table: "Logs",
                nullable: true);
        }
    }
}
