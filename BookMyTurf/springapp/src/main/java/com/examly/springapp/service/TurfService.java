package com.examly.springapp.service;

import com.examly.springapp.model.Turf;

import java.util.List;
import java.util.Optional;

public interface TurfService {
    Turf addTurf(Turf turf);
    Optional<Turf> getTurfById(Long turfId);
    List<Turf> getAllTurfs();
    Turf updateTurf(Long turfId, Turf turf);
    Turf deleteTurf(Long turfId);
    
}
