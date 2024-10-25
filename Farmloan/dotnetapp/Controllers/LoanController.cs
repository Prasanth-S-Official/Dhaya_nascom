using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/loan")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _loanService;

        public LoanController(LoanService loanService)
        {
            _loanService = loanService;
        }

     [Authorize]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
        {
            var loans = await _loanService.GetAllLoans();
            return Ok(loans);
        }
     [Authorize(Roles = "Admin")]

        [HttpGet("{loanId}")]
        public async Task<ActionResult<Loan>> GetLoanById(int loanId)
        {
            var loan = await _loanService.GetLoanById(loanId);

            if (loan == null)
                return NotFound(new { message = "Cannot find any loan" });

            return Ok(loan);
        }

     [Authorize(Roles = "Admin")]

        [HttpPost]
        public async Task<ActionResult> AddLoan([FromBody] Loan loan)
        {
            try
            {
                var success = await _loanService.AddLoan(loan);
                if (success)
                    return Ok(new { message = "Loan added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add loan" });
            }
            catch (Exception ex)
            {
                // Console.WriteLine("ex"+ex);
                return StatusCode(500, new { message = ex.Message });
            }
        }

     [Authorize(Roles = "Admin")]

        [HttpPut("{loanId}")]
        public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
        {
            try
            {
                var success = await _loanService.UpdateLoan(loanId, loan);

                if (success)
                    return Ok(new { message = "Loan updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any loan" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

     [Authorize(Roles = "Admin")]

        [HttpDelete("{loanId}")]
        public async Task<ActionResult> DeleteLoan(int loanId)
        {
            try
            {
                var success = await _loanService.DeleteLoan(loanId);

                if (success)
                    return Ok(new { message = "Loan deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any loan" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
