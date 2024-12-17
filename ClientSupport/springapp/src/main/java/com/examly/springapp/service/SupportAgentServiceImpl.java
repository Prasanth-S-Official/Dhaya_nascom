package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateAgentException;
import com.examly.springapp.exceptions.AgentDeletionException;
import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.repository.SupportAgentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportAgentServiceImpl implements SupportAgentService {

    @Autowired
    private SupportAgentRepo supportAgentRepo;

    @Override
    public SupportAgent addSupportAgent(SupportAgent supportAgent) {
        Optional<SupportAgent> existingAgent = supportAgentRepo.findByEmail(supportAgent.getEmail());
        if (existingAgent.isPresent()) {
            throw new DuplicateAgentException("Agent with the same email already exists.");
        }
        return supportAgentRepo.save(supportAgent);
    }

    @Override
    public Optional<SupportAgent> getSupportAgentById(Long agentId) {
        return supportAgentRepo.findById(agentId);
    }

    @Override
    public List<SupportAgent> getAllSupportAgents() {
        return supportAgentRepo.findAll();
    }

    @Override
    public SupportAgent updateSupportAgent(Long agentId, SupportAgent supportAgent) {
        if (supportAgentRepo.existsById(agentId)) {
            supportAgent.setAgentId(agentId);
            return supportAgentRepo.save(supportAgent);
        }
        return null;
    }

    @Override
    public SupportAgent deleteSupportAgent(Long agentId) {
        Optional<SupportAgent> existingAgent = supportAgentRepo.findById(agentId);
        if (existingAgent.isPresent()) {
            supportAgentRepo.deleteById(agentId);
            return existingAgent.get();
        } else {
            throw new AgentDeletionException("Agent not found for deletion.");
        }
    }
}
