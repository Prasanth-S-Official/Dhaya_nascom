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
    public class PhysicalTrainingRequestService
    {
        private readonly ApplicationDbContext _context;

        public PhysicalTrainingRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PhysicalTrainingRequest>> GetAllPhysicalTrainingRequests()
        {
            return await _context.PhysicalTrainingRequests.Include(r => r.PhysicalTraining).Include(r => r.User).ToListAsync();
        }

        public async Task<IEnumerable<PhysicalTrainingRequest>> GetPhysicalTrainingRequestsByUserId(int userId)
        {
            return await _context.PhysicalTrainingRequests.Include(r => r.PhysicalTraining).Where(r => r.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddPhysicalTrainingRequest(PhysicalTrainingRequest request)
        {
            if (_context.PhysicalTrainingRequests.Any(r => r.PhysicalTrainingId == request.PhysicalTrainingId && r.UserId == request.UserId))
            {
                throw new PhysicalTrainingException("User already requested this training");
            }

            _context.PhysicalTrainingRequests.Add(request);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePhysicalTrainingRequest(int requestId, PhysicalTrainingRequest request)
        {
            var existingRequest = await _context.PhysicalTrainingRequests.FindAsync(requestId);

            if (existingRequest == null)
            {
                return false;
            }

            request.PhysicalTrainingRequestId = requestId;
            _context.Entry(existingRequest).CurrentValues.SetValues(request);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletePhysicalTrainingRequest(int requestId)
        {
            var request = await _context.PhysicalTrainingRequests.FindAsync(requestId);

            if (request == null)
            {
                return false;
            }

            _context.PhysicalTrainingRequests.Remove(request);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
