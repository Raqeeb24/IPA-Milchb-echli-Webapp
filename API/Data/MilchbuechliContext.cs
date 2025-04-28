using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Milchbuechlicontext : DbContext
    {
        public Milchbuechlicontext (DbContextOptions<Milchbuechlicontext> options) : base (options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Transactions)
                .WithOne(t => t.Customer);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Customer)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Remove Autoincrement from AccountId
            modelBuilder.Entity<Account>()
                .Property(a => a.AccountId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Account>()
                .HasMany(a => a.Transactions)
                .WithOne(t => t.Account);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Accounts)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Accounts)
                .WithOne(a => a.Category);
        }
    }
}
