package com.examly.springapp.service;

import com.examly.springapp.model.Ticket;

import java.util.List;
import java.util.Optional;

public interface TicketService {
    Ticket addTicket(Ticket ticket);
    Optional<Ticket> getTicketById(Long ticketId);
    List<Ticket> getAllTickets();
    Ticket updateTicket(Long ticketId, Ticket ticket);
    Ticket deleteTicket(Long ticketId);
    List<Ticket> getTicketsByAgentId(Long agentId);
    List<Ticket> getTicketsByUserId(Long userId);


}
