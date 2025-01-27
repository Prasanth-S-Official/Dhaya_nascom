package com.examly.springapp.controller;

import com.examly.springapp.model.DriverRequest;
import com.examly.springapp.service.DriverRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/driverRequest")
public class DriverRequestController {

    @Autowired
    private DriverRequestService driverRequestService;

    @PostMapping
    public ResponseEntity<DriverRequest> addDriverRequest(@RequestBody DriverRequest driverRequest) {
        DriverRequest newDriverRequest = driverRequestService.addDriverRequest(driverRequest);
        return new ResponseEntity<>(newDriverRequest, HttpStatus.CREATED);
    }

    @GetMapping("/{driverRequestId}")
    public ResponseEntity<DriverRequest> getDriverRequestById(@PathVariable Long driverRequestId) {
        Optional<DriverRequest> driverRequest = driverRequestService.getDriverRequestById(driverRequestId);
        return driverRequest.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<DriverRequest>> getAllDriverRequests() {
        List<DriverRequest> allDriverRequests = driverRequestService.getAllDriverRequests();
        return ResponseEntity.status(HttpStatus.OK).body(allDriverRequests);
    }

    @PutMapping("/{driverRequestId}")
    public ResponseEntity<DriverRequest> updateDriverRequest(@PathVariable Long driverRequestId, @RequestBody DriverRequest driverRequest) {
        DriverRequest updatedDriverRequest = driverRequestService.updateDriverRequest(driverRequestId, driverRequest);
        if (updatedDriverRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedDriverRequest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{driverRequestId}")
    public ResponseEntity<DriverRequest> deleteDriverRequest(@PathVariable Long driverRequestId) {
        DriverRequest deletedDriverRequest = driverRequestService.deleteDriverRequest(driverRequestId);
        if (deletedDriverRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedDriverRequest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DriverRequest>> findDriverRequestsByUserId(@PathVariable Long userId) {
        List<DriverRequest> requests = driverRequestService.findDriverRequestsByUserId(userId);
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(requests);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DriverRequest>> findDriverRequestsByDriverId(@PathVariable Long driverId) {
        List<DriverRequest> requests = driverRequestService.findDriverRequestsByDriverId(driverId);
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(requests);
    }
}
