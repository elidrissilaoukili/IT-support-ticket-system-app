package com.ecomirror.ecomirror.comment;

import com.ecomirror.ecomirror.ticket.Ticket;
import com.ecomirror.ecomirror.ticket.TicketService;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final TicketService ticketService;
    private final CommentRepository commentRepository;

    public CommentService(TicketService ticketService, CommentRepository commentRepository) {
        this.ticketService = ticketService;
        this.commentRepository = commentRepository;
    }

    public CommentDTO createComment(CommentCreateRequest commentCreateRequest) {
        // Validate the ticket exists by ticketId
        Ticket ticket = ticketService.findById(commentCreateRequest.getTicketId());
        if (ticket == null) {
            throw new IllegalArgumentException("Invalid ticket.");
        }

        // Create and save the comment
        Comment comment = new Comment();
        comment.setComment(commentCreateRequest.getComment());
        comment.setTicket(ticket);

        // Save the comment to the database
        Comment savedComment = commentRepository.save(comment);

        // Convert saved Comment entity to CommentDTO
        return new CommentDTO(savedComment);
    }

}
