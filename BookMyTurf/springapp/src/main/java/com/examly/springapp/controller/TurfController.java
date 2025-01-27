package com.examly.springapp.controller;

import com.examly.springapp.exception.DuplicateTurfException;
import com.examly.springapp.exception.TurfNotFoundException;
import com.examly.springapp.model.Turf;
import com.examly.springapp.service.TurfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turf")
public class TurfController {

    @Autowired
    private TurfService turfService;

    @PostMapping
    public ResponseEntity<?> addTurf(@RequestBody Turf turf) {
        try {
            Turf newTurf = turfService.addTurf(turf);
            return new ResponseEntity<>(newTurf, HttpStatus.CREATED); // 201 Created
        } catch (DuplicateTurfException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT); // 409 Conflict
        }
    }

    @GetMapping("/{turfId}")
    public ResponseEntity<Turf> getTurfById(@PathVariable Long turfId) {
        Optional<Turf> turf = turfService.getTurfById(turfId);
        return turf.map(value -> ResponseEntity.status(HttpStatus.OK).body(value)) // 200 OK
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // 404 Not Found
    }

    @GetMapping
    public ResponseEntity<List<Turf>> getAllTurfs() {
        List<Turf> allTurfs = turfService.getAllTurfs();
        return ResponseEntity.status(HttpStatus.OK).body(allTurfs); // 200 OK
    }

    @PutMapping("/{turfId}")
    public ResponseEntity<?> updateTurf(@PathVariable Long turfId, @RequestBody Turf turf) {
        try {
            Turf updatedTurf = turfService.updateTurf(turfId, turf);
            return ResponseEntity.status(HttpStatus.OK).body(updatedTurf); // 200 OK
        } catch (TurfNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }

    @DeleteMapping("/{turfId}")
    public ResponseEntity<?> deleteTurf(@PathVariable Long turfId) {
        try {
            Turf deletedTurf = turfService.deleteTurf(turfId);
            return ResponseEntity.status(HttpStatus.OK).body(deletedTurf); // 200 OK
        } catch (TurfNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }


}
