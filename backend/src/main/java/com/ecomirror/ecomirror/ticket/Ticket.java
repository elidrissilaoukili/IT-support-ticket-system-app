package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.comment.Comment;
import com.ecomirror.ecomirror.ticket.enums.CategoryEnum;
import com.ecomirror.ecomirror.ticket.enums.PriorityEnum;
import com.ecomirror.ecomirror.ticket.enums.TicketStatusEnum;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriorityEnum priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryEnum category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatusEnum status = TicketStatusEnum.NEW;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser appUser;

    @JsonManagedReference
    @OneToMany(mappedBy = "ticket")
    private List<Comment> comments;

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

    public Ticket() {
    }

    public Ticket(String title, String description, PriorityEnum priority, CategoryEnum category, TicketStatusEnum status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

