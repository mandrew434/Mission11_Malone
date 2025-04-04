using System.ComponentModel.DataAnnotations;

namespace Mission11_Malone.Data
{
    // Book class to represent the Book table in the database
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string Author { get; set; }
        [Required]
        public required string Publisher { get; set; }
        [Required]
        public required string ISBN { get; set; }
        [Required]
        public required string Classification { get; set; }
        [Required]
        public required string Category { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public float Price { get; set; }
    }
}
