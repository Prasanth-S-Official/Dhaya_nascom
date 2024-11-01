using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/physical-training-request")]
    [ApiController]
    public class PhysicalTrainingRequestController : ControllerBase
    {
        private readonly PhysicalTrainingRequestService _physicalTrainingRequestService;

        public PhysicalTrainingRequestController(PhysicalTrainingRequestService physicalTrainingRequestService)
        {
            _physicalTrainingRequestService = physicalTrainingRequestService;
        }

        // [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetAllPhysicalTrainingRequests()
        {
            var requests = await _physicalTrainingRequestService.GetAllPhysicalTrainingRequests();
            return Ok(requests);
        }

        // [Authorize(Roles = "User")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetPhysicalTrainingRequestsByUserId(int userId)
        {
            var requests = await _physicalTrainingRequestService.GetPhysicalTrainingRequestsByUserId(userId);
            return Ok(requests);
        }

        // [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTrainingRequest([FromBody] PhysicalTrainingRequest request)
        {
            try
            {
                await _physicalTrainingRequestService.AddPhysicalTrainingRequest(request);
                return Ok(new { message = "Physical training request added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("{requestId}")]
        public async Task<ActionResult> UpdatePhysicalTrainingRequest(int requestId, [FromBody] PhysicalTrainingRequest request)
        {
            try
            {
                var success = await _physicalTrainingRequestService.UpdatePhysicalTrainingRequest(requestId, request);

                if (success)
                {
                    return Ok(new { message = "Physical training request updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find the request" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "User")]
        [HttpDelete("{requestId}")]
        public async Task<ActionResult> DeletePhysicalTrainingRequest(int requestId)
        {
            try
            {
                var success = await _physicalTrainingRequestService.DeletePhysicalTrainingRequest(requestId);

                if (success)
                {
                    return Ok(new { message = "Physical training request deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find the request" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
