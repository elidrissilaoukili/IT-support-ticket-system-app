package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.comment.Comment;
import com.ecomirror.ecomirror.ticket.enums.CategoryEnum;
import com.ecomirror.ecomirror.ticket.enums.PriorityEnum;
import com.ecomirror.ecomirror.ticket.enums.TicketStatusEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class TicketDTO {

    private Long id;
    private String title;
    private String description;
    private PriorityEnum priority;
    private CategoryEnum category;
    private TicketStatusEnum status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<Comment> comments;  // List of comments for the ticket


    // Constructor to create DTO from Ticket entity
    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.title = ticket.getTitle();
        this.description = ticket.getDescription();
        this.priority = ticket.getPriority();
        this.category = ticket.getCategory();
        this.status = ticket.getStatus();
        this.createdAt = ticket.getCreatedAt();
        this.updatedAt = ticket.getUpdatedAt();

        this.comments = ticket.getComments();
    }

    // Constructor to create DTO manually
    public TicketDTO(String title, String description, PriorityEnum priority, CategoryEnum category, TicketStatusEnum status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
