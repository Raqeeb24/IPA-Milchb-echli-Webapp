using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Dtos;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly Milchbuechlicontext _context;

        public TransactionsController(Milchbuechlicontext context)
        {
            _context = context;
        }

        // GET: api/Transactions/Customer/5
        [HttpGet("Customer/{id}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetCustomerTransactions(int id)
        {
            return await _context.Transactions
                .Where(t => t.CustomerId == id)
                .AsNoTracking()
                .ToListAsync();
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }


        // GET: api/Transactions/5
        [HttpGet("CustomerReport/{id}")]
        public async Task<ActionResult<Transaction>> GetSumByCategory(int id)
        {
            var result = await _context.Transactions
                .GroupBy(t => new { t.Account })
                .Select(
                t =>
                    new
                    {
                        AccountName = t.Key.Account.AccountName,
                        TotalAmount = t.Sum(t => t.Amount)
                    })
                .ToListAsync();
            /*var totalTransactionByCategory = await _context.Transactions
                .Select(t => new
                {
                    CustomerId = t.CustomerId,
                    AccountId = t.AccountId,
                    AccountNamet.Account.AccountName,
                    t.Account.CategoryId,
                    
                    
                })
                .Where(t => t.CustomerId == id)
                .Sum(t => t.Amount)
                .AsNoTracking()
                .ToListAsync();
            */

            if (result.Count > 0)
            {
                return Ok(result);
            }

            return Ok();
        }

        // PUT: api/Transactions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, [FromBody] TransactionDto transactionDto)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            transaction.AccountId = transactionDto.AccountId;
            transaction.Description = transactionDto.Description;
            transaction.Amount = transactionDto.Amount;
            transaction.Date = transactionDto.Date;
            transaction.CustomerId = transactionDto.CustomerId;

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Transactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostTransaction([FromBody] TransactionDto transactionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Console.WriteLine("DTO" + transactionDto.CustomerId + " " + transactionDto.Description);
            var transaction = new Transaction()
            {
                AccountId = transactionDto.AccountId,
                Description = transactionDto.Description,
                Amount = transactionDto.Amount,
                Date = transactionDto.Date,
                CustomerId = transactionDto.CustomerId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.TransactionId == id);
        }
    }
}
