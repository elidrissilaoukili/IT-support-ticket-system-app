package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;
import com.ecomirror.ecomirror.ticket.enums.TicketStatusEnum;
import com.ecomirror.ecomirror.ticket.requests.TicketCreateRequest;
import com.ecomirror.ecomirror.ticket.requests.TicketUpdateRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final AppUserRepository appUserRepository;

    public TicketService(TicketRepository ticketRepository, AppUserRepository appUserRepository) {
        this.ticketRepository = ticketRepository;
        this.appUserRepository = appUserRepository;
    }


    /*
     *
     */
    public Ticket findById(Long ticketId) {
        return ticketRepository.findById(Math.toIntExact(ticketId)).orElse(null);
    }

    public boolean exists(Long ticketId) {
        return ticketRepository.existsById(Math.toIntExact(ticketId));
    }
    /*
     *
     */

    public TicketDTO createTicket(TicketCreateRequest ticketCreateRequest) {

        UserDetails currentUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        AppUser appUser = appUserRepository.findByEmail(currentUser.getUsername());

        if (appUser == null) {
            throw new RuntimeException("User not found: " + currentUser.getUsername());
        }

        Ticket ticket = new Ticket();
        ticket.setTitle(ticketCreateRequest.getTitle());
        ticket.setDescription(ticketCreateRequest.getDescription());
        ticket.setPriority(ticketCreateRequest.getPriority());
        ticket.setCategory(ticketCreateRequest.getCategory());
        ticket.setStatus(TicketStatusEnum.NEW);  // Default to 'NEW'
        ticket.setAppUser(appUser);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        ticket = ticketRepository.save(ticket);
        return new TicketDTO(ticket);  // Map Ticket to TicketDTO and return
    }


    public TicketDTO updateTicket(TicketUpdateRequest ticketUpdateRequest, Long ticketId) {

        // Find ticket by ID using
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId)).orElseThrow(
                () -> new RuntimeException("No ticket found with ID: " + ticketId));

        // Update the ticket fields
        ticket.setTitle(ticketUpdateRequest.getTitle());
        ticket.setDescription(ticketUpdateRequest.getDescription());
        ticket.setPriority(ticketUpdateRequest.getPriority());
        ticket.setCategory(ticketUpdateRequest.getCategory());
        ticket.setStatus(ticketUpdateRequest.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());

        // Save the updated ticket and return DTO
        ticket = ticketRepository.save(ticket);
        return new TicketDTO(ticket);
    }

    public TicketDTO updateEmployeeTicket(TicketUpdateRequest ticketUpdateRequest, Long ticketId, String currentUserEmail) {
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId)).orElseThrow(
                () -> new RuntimeException("No ticket found with ID: " + ticketId));

        // Check if the ticket belongs to the current employee
        if (!ticket.getAppUser().getEmail().equals(currentUserEmail)) {
            throw new AccessDeniedException("You can only update tickets that you have created.");
        }

        // Update the ticket fields
        ticket.setTitle(ticketUpdateRequest.getTitle());
        ticket.setDescription(ticketUpdateRequest.getDescription());
        ticket.setPriority(ticketUpdateRequest.getPriority());
        ticket.setCategory(ticketUpdateRequest.getCategory());
        ticket.setStatus(ticketUpdateRequest.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());

        // Save the updated ticket and return DTO
        ticket = ticketRepository.save(ticket);
        return new TicketDTO(ticket);
    }


    public List<TicketDTO> findAll() {
        List<Ticket> tickets = ticketRepository.findAll();
        return tickets.stream()
                .map(TicketDTO::new)
                .collect(Collectors.toList());
    }

    public List<TicketDTO> findTicketsByEmployeeEmail(String email) {
        List<Ticket> tickets = ticketRepository.findByAppUserEmail(email); // Assuming you have a method like this in your repository
        return tickets.stream()
                .map(TicketDTO::new)
                .collect(Collectors.toList());
    }


    public TicketDTO getTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId))
                .orElseThrow(() -> new RuntimeException("No ticket found with ID: " + ticketId));

        return new TicketDTO(ticket);
    }

    public TicketDTO getEmployeeTicket(Long ticketId, String currentUserEmail) {
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId)).orElseThrow(
                () -> new RuntimeException("No ticket found with ID: " + ticketId));

        // Check if the ticket belongs to the current employee
        if (!ticket.getAppUser().getEmail().equals(currentUserEmail)) {
            throw new AccessDeniedException("You can only view tickets that you have created.");
        }

        return new TicketDTO(ticket);  // Return DTO for ticket
    }


    public String deleteTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId))
                .orElseThrow(() -> new RuntimeException("No ticket found with ID: " + ticketId));

        ticketRepository.delete(ticket);
        return "Ticket " + ticketId + " deleted successfully";
    }

    public void deleteEmployeeTicket(Long ticketId, String currentUserEmail) {
        Ticket ticket = ticketRepository.findById(Math.toIntExact(ticketId)).orElseThrow(
                () -> new RuntimeException("No ticket found with ID: " + ticketId));

        // Check if the ticket belongs to the current employee
        if (!ticket.getAppUser().getEmail().equals(currentUserEmail)) {
            throw new AccessDeniedException("You can only delete tickets that you have created.");
        }

        ticketRepository.delete(ticket);  // Delete the ticket
    }
}
