using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/loan-application")]
    [ApiController]
    public class LoanApplicationController : ControllerBase
    {
        private readonly LoanApplicationService _loanApplicationService;

        public LoanApplicationController(LoanApplicationService loanApplicationService)
        {
            _loanApplicationService = loanApplicationService;
        }
     [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanApplication>>> GetAllLoanApplications()
        {
            var loanApplications = await _loanApplicationService.GetAllLoanApplications();
            return Ok(loanApplications);
        }

        // [HttpGet("{loanApplicationId}")]
        // public async Task<ActionResult<LoanApplication>> GetLoanApplicationById(int loanApplicationId)
        // {
        //     var loanApplication = await _loanApplicationService.GetLoanApplicationById(loanApplicationId);

        //     if (loanApplication == null)
        //     {
        //         return NotFound(new { message = "Cannot find any loan application" });
        //     }

        //     return Ok(loanApplication);
        // }


        [Authorize(Roles = "User")]

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<LoanApplication>> GetLoanApplicationByUserId(int userId)
        {
            var loanApplications = await _loanApplicationService.GetLoanApplicationsByUserId(userId);

            if (loanApplications == null)
            {
                return NotFound(new { message = "Cannot find any loan application" });
            }

            return Ok(loanApplications);
        }

     [Authorize(Roles = "User")]

        [HttpPost]
        public async Task<ActionResult> AddLoanApplication([FromBody] LoanApplication loanApplication)
        {
            try
            {
                await _loanApplicationService.AddLoanApplication(loanApplication);

                return Ok(new { message = "Loan application added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

       [Authorize(Roles = "Admin")]

        [HttpPut("{loanApplicationId}")]
        public async Task<ActionResult> UpdateLoanApplication(int loanApplicationId, [FromBody] LoanApplication loanApplication)
        {
            try
            {
                var success = await _loanApplicationService.UpdateLoanApplication(loanApplicationId, loanApplication);

                if (success)
                {
                    return Ok(new { message = "Loan application updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any loan application" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
       [Authorize(Roles = "User")]

        [HttpDelete("{loanApplicationId}")]
        public async Task<ActionResult> DeleteLoanApplication(int loanApplicationId)
        {
            try
            {
                var success = await _loanApplicationService.DeleteLoanApplication(loanApplicationId);

                if (success)
                {
                    return Ok(new { message = "Loan application deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any loan application" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
