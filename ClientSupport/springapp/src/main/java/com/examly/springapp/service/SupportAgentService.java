package com.examly.springapp.service;

import com.examly.springapp.model.SupportAgent;

import java.util.List;
import java.util.Optional;

public interface SupportAgentService {
    SupportAgent addSupportAgent(SupportAgent supportAgent);
    Optional<SupportAgent> getSupportAgentById(Long agentId);
    List<SupportAgent> getAllSupportAgents();
    SupportAgent updateSupportAgent(Long agentId, SupportAgent supportAgent);
    SupportAgent deleteSupportAgent(Long agentId);
}
