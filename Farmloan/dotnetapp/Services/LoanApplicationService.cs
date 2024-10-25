using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class LoanApplicationService
    {
        private readonly ApplicationDbContext _context;

        public LoanApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LoanApplication>> GetAllLoanApplications()
        {
            return await _context.LoanApplications.Include(r => r.Loan).Include(r => r.User).ToListAsync();
        }

        // public async Task<LoanApplication> GetLoanApplicationById(int loanApplicationId)
        // {
        //     return await _context.LoanApplications.FindAsync(loanApplicationId);
        // }

        public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(int userId)
        {
            return await _context.LoanApplications.Include(r => r.Loan).Where(la => la.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddLoanApplication(LoanApplication loanApplication)
        {
                if ( _context.LoanApplications.Any(l => l.LoanId == loanApplication.LoanId && l.UserId == loanApplication.UserId))  
                {
                    throw new LoanException("User already applied for this loan");
                }
                
                    _context.LoanApplications.Add(loanApplication);
                await _context.SaveChangesAsync();
                return true;
            
                

        }

        public async Task<bool> UpdateLoanApplication(int loanApplicationId, LoanApplication loanApplication)
        {
            
                var existingLoanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);

                if (existingLoanApplication == null)
                {
                    return false;
                }

                loanApplication.LoanApplicationId = loanApplicationId;

                _context.Entry(existingLoanApplication).CurrentValues.SetValues(loanApplication);
                await _context.SaveChangesAsync();

                return true;
           
        }

        public async Task<bool> DeleteLoanApplication(int loanApplicationId)
        {
            var loanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);

                if (loanApplication == null)
                {
                    return false;
                }

                _context.LoanApplications.Remove(loanApplication);
                await _context.SaveChangesAsync();

                return true;
          
        }
    }
}
