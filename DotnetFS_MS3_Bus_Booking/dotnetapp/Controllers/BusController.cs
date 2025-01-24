using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bus>>> GetBuses()
        {
            return await _context.Buses.ToListAsync();
        }

        // GET: api/Bus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bus>> GetBus(int id)
        {
            var bus = await _context.Buses.FindAsync(id);

            if (bus == null)
            {
                return NotFound();
            }

            return bus;
        }

        // POST: api/Bus
        [HttpPost]
        public async Task<ActionResult<Bus>> PostBus(Bus bus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Buses.Add(bus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBus", new { id = bus.bookingId }, bus);
        }

        // PUT: api/Bus/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBus(int id, [FromBody] Bus updatedBus)
        {
            if (id != updatedBus.bookingId)
            {
                return BadRequest("Bus ID mismatch");
            }

            var bus = await _context.Buses.FindAsync(id);
            if (bus == null)
            {
                return NotFound();
            }

            bus.busNumber = updatedBus.busNumber;
            bus.routeSource = updatedBus.routeSource;
            bus.routeDestination = updatedBus.routeDestination;
            bus.passengerName = updatedBus.passengerName;
            bus.bookingDate = updatedBus.bookingDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Bus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var bus = await _context.Buses.FindAsync(id);
            if (bus == null)
            {
                return NotFound();
            }

            _context.Buses.Remove(bus);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
