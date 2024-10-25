using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;


namespace dotnetapp.Services
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;

        public LoanService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Loan>> GetAllLoans()
        {
            return await _context.Loans.ToListAsync();
        }

        public async Task<Loan> GetLoanById(int loanId)
        {
            return await _context.Loans.FirstOrDefaultAsync(l => l.LoanId == loanId);
        }

        public async Task<bool> AddLoan(Loan loan)
        {
           
                if (_context.Loans.Any(l => l.LoanType == loan.LoanType))
                {
                    throw new LoanException("Loan with the same type already exists");
                }
                _context.Loans.Add(loan);
                await _context.SaveChangesAsync();
                return true;
         
        }

        public async Task<bool> UpdateLoan(int loanId, Loan loan)
        {
         
                var existingLoan = await _context.Loans.FirstOrDefaultAsync(l => l.LoanId == loanId);

                if (existingLoan == null)
                    return false;
    if (_context.Loans.Any(l => l.LoanType == loan.LoanType && l.LoanId != loanId))
    {
        throw new LoanException("Loan with the same type already exists");
    }
                loan.LoanId = loanId;
                _context.Entry(existingLoan).CurrentValues.SetValues(loan);
                await _context.SaveChangesAsync();

                return true;
          
        }

        public async Task<bool> DeleteLoan(int loanId)
        {
            
                var loan = await _context.Loans.FirstOrDefaultAsync(l => l.LoanId == loanId);
                if (loan == null)
                    return false;
                if (_context.LoanApplications.Any(l => l.LoanId == loan.LoanId))  
                {
                    throw new LoanException("Loan cannot be deleted, it is referenced in loanapplication");
                }
                
                _context.Loans.Remove(loan);
                await _context.SaveChangesAsync();
                return true;
          
        }
    }
}
