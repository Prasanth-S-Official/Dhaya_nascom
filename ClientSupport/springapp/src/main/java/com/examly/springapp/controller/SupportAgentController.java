package com.examly.springapp.controller;

import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.service.SupportAgentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/supportAgent")
public class SupportAgentController {

    @Autowired
    private SupportAgentService supportAgentService;

    @PostMapping
    public ResponseEntity<?> addSupportAgent(@RequestBody SupportAgent supportAgent) {
        SupportAgent newAgent = supportAgentService.addSupportAgent(supportAgent);
        return new ResponseEntity<>(newAgent, HttpStatus.CREATED);
    }

    @GetMapping("/{agentId}")
    public ResponseEntity<SupportAgent> getSupportAgentById(@PathVariable Long agentId) {
        Optional<SupportAgent> agent = supportAgentService.getSupportAgentById(agentId);
        return agent.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<SupportAgent>> getAllSupportAgents() {
        List<SupportAgent> allAgents = supportAgentService.getAllSupportAgents();
        return ResponseEntity.status(HttpStatus.OK).body(allAgents);
    }

    @PutMapping("/{agentId}")
    public ResponseEntity<SupportAgent> updateSupportAgent(@PathVariable Long agentId, @RequestBody SupportAgent supportAgent) {
        SupportAgent updatedAgent = supportAgentService.updateSupportAgent(agentId, supportAgent);
        if (updatedAgent != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedAgent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{agentId}")
    public ResponseEntity<SupportAgent> deleteSupportAgent(@PathVariable Long agentId) {
        SupportAgent deletedAgent = supportAgentService.deleteSupportAgent(agentId);
        if (deletedAgent != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedAgent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
