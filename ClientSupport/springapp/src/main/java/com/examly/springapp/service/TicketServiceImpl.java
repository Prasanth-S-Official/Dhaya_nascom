package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateTicketException;
import com.examly.springapp.exceptions.TicketDeletionException;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.repository.TicketRepo;
import com.examly.springapp.repository.SupportAgentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepo ticketRepo;

    @Autowired
    private SupportAgentRepo supportAgentRepo;

    @Override
    public Ticket addTicket(Ticket ticket) {
        // Optional: Check for duplicate tickets by title
        Optional<Ticket> existingTicket = ticketRepo.findByTitle(ticket.getTitle());
        if (existingTicket.isPresent()) {
            throw new DuplicateTicketException("Ticket with the same title already exists.");
        }

        // Handle cases where the support agent is optional (can be null)
        if (ticket.getSupportAgent() != null && !supportAgentRepo.existsById(ticket.getSupportAgent().getAgentId())) {
            throw new IllegalArgumentException("Support Agent with ID " + ticket.getSupportAgent().getAgentId() + " does not exist.");
        }

        return ticketRepo.save(ticket);
    }

    @Override
    public Optional<Ticket> getTicketById(Long ticketId) {
        return ticketRepo.findById(ticketId);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    @Override
    public Ticket updateTicket(Long ticketId, Ticket ticket) {
        if (ticketRepo.existsById(ticketId)) {
            ticket.setTicketId(ticketId);
            return ticketRepo.save(ticket);
        }
        return null;
    }

    @Override
    public Ticket deleteTicket(Long ticketId) {
        Optional<Ticket> existingTicket = ticketRepo.findById(ticketId);
        if (existingTicket.isPresent()) {
            ticketRepo.deleteById(ticketId);
            return existingTicket.get();
        } else {
            throw new TicketDeletionException("Ticket not found for deletion.");
        }
    }

    @Override
    public List<Ticket> getTicketsByAgentId(Long agentId) {
        return ticketRepo.findBySupportAgent_AgentId(agentId);
    }
}
