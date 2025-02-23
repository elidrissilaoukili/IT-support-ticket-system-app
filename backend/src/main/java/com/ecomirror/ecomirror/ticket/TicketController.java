package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.ticket.requests.TicketCreateRequest;
import com.ecomirror.ecomirror.ticket.requests.TicketUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("")
    public ResponseEntity<?> createTicket(@RequestBody @Valid TicketCreateRequest ticketCreateRequest, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError fieldError : result.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }
        TicketDTO ticket = ticketService.createTicket(ticketCreateRequest);
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("")
    public List<TicketDTO> getAllTickets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ITSUPPORT"))) {
            return ticketService.findAll();
        } else if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_EMPLOYEE"))) {
            return ticketService.findTicketsByEmployeeEmail(currentUserEmail);
        } else {
            throw new AccessDeniedException("User does not have the required role to view tickets");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTicket(@RequestBody @Valid TicketUpdateRequest ticketUpdateRequest, @PathVariable Long id, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError fieldError : result.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the current user's email

        TicketDTO updatedTicket;

        if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ITSUPPORT"))) {
            updatedTicket = ticketService.updateTicket(ticketUpdateRequest, id);
        } else if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_EMPLOYEE"))) {
            updatedTicket = ticketService.updateEmployeeTicket(ticketUpdateRequest, id, currentUserEmail);
        } else {
            throw new AccessDeniedException("User does not have the required role to update the ticket");
        }

        return ResponseEntity.ok(updatedTicket);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getTicket(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the current user's email

        TicketDTO ticketDTO;

        // Check if the user has the "ITSUPPORT" role
        if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ITSUPPORT"))) {
            // ITSupport can view any ticket
            ticketDTO = ticketService.getTicket(id);
        } else if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_EMPLOYEE"))) {
            // Employee can only view their own ticket
            ticketDTO = ticketService.getEmployeeTicket(id, currentUserEmail);
        } else {
            throw new AccessDeniedException("User does not have the required role to view the ticket");
        }

        return ResponseEntity.ok(ticketDTO);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the current user's email

        if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ITSUPPORT"))) {
            ticketService.deleteTicket(id);
        } else if (authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_EMPLOYEE"))) {
            ticketService.deleteEmployeeTicket(id, currentUserEmail);
        } else {
            throw new AccessDeniedException("User does not have the required role to delete the ticket");
        }

        return ResponseEntity.noContent().build();  // 204 No Content for successful deletion
    }

}
