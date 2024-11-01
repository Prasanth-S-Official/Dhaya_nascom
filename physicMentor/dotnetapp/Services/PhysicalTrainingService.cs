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
    public class PhysicalTrainingService
    {
        private readonly ApplicationDbContext _context;

        public PhysicalTrainingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PhysicalTraining>> GetAllPhysicalTrainings()
        {
            return await _context.PhysicalTrainings.ToListAsync();
        }

        public async Task<PhysicalTraining> GetPhysicalTrainingById(int trainingId)
        {
            return await _context.PhysicalTrainings.FirstOrDefaultAsync(t => t.PhysicalTrainingId == trainingId);
        }

        public async Task<bool> AddPhysicalTraining(PhysicalTraining training)
        {
            if (_context.PhysicalTrainings.Any(t => t.TrainingName == training.TrainingName))
            {
                throw new PhysicalTrainingException("Training with the same name already exists");
            }
            _context.PhysicalTrainings.Add(training);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePhysicalTraining(int trainingId, PhysicalTraining training)
        {
            var existingTraining = await _context.PhysicalTrainings.FirstOrDefaultAsync(t => t.PhysicalTrainingId == trainingId);

            if (existingTraining == null)
                return false;

            if (_context.PhysicalTrainings.Any(t => t.TrainingName == training.TrainingName && t.PhysicalTrainingId != trainingId))
            {
                throw new PhysicalTrainingException("Training with the same name already exists");
            }

            training.PhysicalTrainingId = trainingId;
            _context.Entry(existingTraining).CurrentValues.SetValues(training);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletePhysicalTraining(int trainingId)
        {
            var training = await _context.PhysicalTrainings.FirstOrDefaultAsync(t => t.PhysicalTrainingId == trainingId);
            if (training == null)
                return false;

            if (_context.PhysicalTrainingRequests.Any(r => r.PhysicalTrainingId == training.PhysicalTrainingId))
            {
                throw new PhysicalTrainingException("Training cannot be deleted as it is referenced in a request");
            }

            _context.PhysicalTrainings.Remove(training);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
