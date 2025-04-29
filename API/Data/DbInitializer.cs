using API.Models;

namespace API.Data
{
    public class DbInitializer
    {
        public static void Initialize(Milchbuechlicontext context)
        {
            context.Database.EnsureCreated();

            if (context.Customers.Any()) return;

            var customers = new Customer[]
            {
                 new Customer{CustomerName="Pizza Center Lengnau", Address="sdf", Zip=2542, Place="Lengnau" },
                 new Customer{CustomerName="Biel Vue Revassi", Address="asdf", Zip=2542, Place="Lengnau" },
                 new Customer{CustomerName="Icono Coiffeur Shahin", Address="asdfjk", Zip=2542, Place="Lenzburg" },
                 new Customer{CustomerName="Einzelunternehmen", Address="sdf", Zip=2542, Place="Lengnau" },
            };

            foreach (var c in customers)
            {
                context.Customers.Add(c);
            }

            context.SaveChanges();

            var categories = new Category[]
            {
                 new Category{CategoryName="Einnahmen"},
                 new Category{CategoryName="Material und Dienstleistungen"},
                 new Category{CategoryName="Personalaufwand"},
                 new Category{CategoryName="Miete"},
                 new Category{CategoryName="Fahrzeugaufwand"},
                 new Category{CategoryName="Finanzaufwand"},
            };

            foreach (var c in categories) { context.Categories.Add(c); }

            context.SaveChanges();

            var accounts = new Account[]
            {
                 new Account{AccountId=3000, AccountName="Einnahmen Kasse", CategoryId=1},
                 new Account{AccountId=3010, AccountName="Einnahmen Worldline/Sumup", CategoryId=1},
                 new Account{AccountId=3020, AccountName="Einnahmen Eat.ch", CategoryId=1},
                 new Account{AccountId=3030, AccountName="Einnahmen TWINT", CategoryId=1},
                 new Account{AccountId=3040, AccountName="Bank", CategoryId=1},
                 new Account{AccountId=4000, AccountName="Materialeinkauf", CategoryId=2},
                 new Account{AccountId=4400, AccountName="Einkauf Dienstleistungen", CategoryId=2},
                 new Account{AccountId=5000, AccountName="Lohnaufwand", CategoryId=3},
                 new Account{AccountId=6000, AccountName="Miete", CategoryId=4},
                 new Account{AccountId=6200, AccountName="Fahrzeugaufwand", CategoryId=5},
                 new Account{AccountId=6900, AccountName="Finanzaufwand", CategoryId=6},
            };

            foreach (var a in accounts) { context.Accounts.Add(a); }

            context.SaveChanges();

            if (!context.Transactions.Any())
            {
                var transactions = new Transaction[]
                {
                     new Transaction {AccountId=3000, Description="blabla", Amount=12.50m,Date=DateTime.Now, CustomerId=1},
                     new Transaction {AccountId=4000, Description="blablablablablablablablablabla", Amount=1099m, Date=DateTime.Now, CustomerId=1},
                     new Transaction {AccountId=6000, Description="blablablabla", Amount=5000.50m, Date=DateTime.Now, CustomerId=1 },
                };

                foreach (var t in transactions)
                {
                    context.Transactions.Add(t);
                }
                context.SaveChanges();
            }
        }
    }
}
