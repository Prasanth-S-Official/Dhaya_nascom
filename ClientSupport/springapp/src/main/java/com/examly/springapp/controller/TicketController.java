package com.examly.springapp.controller;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.service.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public ResponseEntity<?> addTicket(@RequestBody Ticket ticket) {
        try {
            Ticket newTicket = ticketService.addTicket(ticket);
            return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long ticketId) {
        Optional<Ticket> ticket = ticketService.getTicketById(ticketId);
        return ticket.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> allTickets = ticketService.getAllTickets();
        return ResponseEntity.status(HttpStatus.OK).body(allTickets);
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long ticketId, @RequestBody Ticket ticket) {
        Ticket updatedTicket = ticketService.updateTicket(ticketId, ticket);
        if (updatedTicket != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedTicket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable Long ticketId) {
        Ticket deletedTicket = ticketService.deleteTicket(ticketId);
        if (deletedTicket != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedTicket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<Ticket>> getTicketsByAgentId(@PathVariable Long agentId) {
        List<Ticket> tickets = ticketService.getTicketsByAgentId(agentId);
        if (tickets.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(tickets);
    }
}
