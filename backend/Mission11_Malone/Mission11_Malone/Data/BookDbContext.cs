using Microsoft.EntityFrameworkCore;

namespace Mission11_Malone.Data
{
    public class BookDbContext: DbContext
    {
        // Constructor to pass the options to the base class
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        // DbSet to represent the Book table in the database
        public DbSet<Book> Books { get; set; }
    }
}
