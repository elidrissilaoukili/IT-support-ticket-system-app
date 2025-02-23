package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.ticket.enums.CategoryEnum;
import com.ecomirror.ecomirror.ticket.enums.PriorityEnum;
import com.ecomirror.ecomirror.ticket.enums.TicketStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String comment;

    // Each comment has one ticket
    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Comment() {
    }

    public Comment(String comment, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.comment = comment;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
