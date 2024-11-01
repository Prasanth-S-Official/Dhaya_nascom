using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/physicalTraining")]
    [ApiController]
    public class PhysicalTrainingController : ControllerBase
    {
        private readonly PhysicalTrainingService _physicalTrainingService;

        public PhysicalTrainingController(PhysicalTrainingService physicalTrainingService)
        {
            _physicalTrainingService = physicalTrainingService;
        }

        // [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTraining>>> GetAllPhysicalTrainings()
        {
            var trainings = await _physicalTrainingService.GetAllPhysicalTrainings();
            return Ok(trainings);
        }

        // [Authorize(Roles = "Admin")]
        [HttpGet("{trainingId}")]
        public async Task<ActionResult<PhysicalTraining>> GetPhysicalTrainingById(int trainingId)
        {
            var training = await _physicalTrainingService.GetPhysicalTrainingById(trainingId);

            if (training == null)
                return NotFound(new { message = "Cannot find any training" });

            return Ok(training);
        }

        // [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTraining([FromBody] PhysicalTraining training)
        {
            try
            {
                var success = await _physicalTrainingService.AddPhysicalTraining(training);
                if (success)
                    return Ok(new { message = "Physical training added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add physical training" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("{trainingId}")]
        public async Task<ActionResult> UpdatePhysicalTraining(int trainingId, [FromBody] PhysicalTraining training)
        {
            try
            {
                var success = await _physicalTrainingService.UpdatePhysicalTraining(trainingId, training);
                if (success)
                    return Ok(new { message = "Physical training updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any training" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("{trainingId}")]
        public async Task<ActionResult> DeletePhysicalTraining(int trainingId)
        {
            try
            {
                var success = await _physicalTrainingService.DeletePhysicalTraining(trainingId);
                if (success)
                    return Ok(new { message = "Physical training deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any training" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
