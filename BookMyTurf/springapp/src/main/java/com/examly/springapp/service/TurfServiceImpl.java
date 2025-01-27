package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateTurfException;
import com.examly.springapp.exceptions.TurfNotFoundException;
import com.examly.springapp.model.Turf;
import com.examly.springapp.repository.TurfRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurfServiceImpl implements TurfService {

    @Autowired
    private TurfRepo turfRepo;

    @Override
    public Turf addTurf(Turf turf) {
        // Check for duplicate turf by name
        if (turfRepo.existsByTurfName(turf.getTurfName())) {
            throw new DuplicateTurfException("Turf with name " + turf.getTurfName() + " already exists.");
        }
        return turfRepo.save(turf);
    }

    @Override
    public Optional<Turf> getTurfById(Long turfId) {
        return turfRepo.findById(turfId);
    }

    @Override
    public List<Turf> getAllTurfs() {
        return turfRepo.findAll();
    }

    @Override
    public Turf updateTurf(Long turfId, Turf turf) {
        if (turfRepo.existsById(turfId)) {
            turf.setTurfId(turfId);
            return turfRepo.save(turf);
        }
        throw new TurfNotFoundException("Turf not found with ID: " + turfId);
    }

    @Override
    public Turf deleteTurf(Long turfId) {
        Optional<Turf> existingTurf = turfRepo.findById(turfId);
        if (existingTurf.isPresent()) {
            turfRepo.deleteById(turfId);
            return existingTurf.get();
        } else {
            throw new TurfNotFoundException("Turf not found for deletion.");
        }
    }
}
