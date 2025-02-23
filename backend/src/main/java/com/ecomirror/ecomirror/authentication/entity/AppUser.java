package com.ecomirror.ecomirror.authentication.entity;

import com.ecomirror.ecomirror.ticket.Ticket;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String description;
    private boolean status = Boolean.TRUE;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Each user has one role
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // Direct ManyToMany mapping for extra user-specific permissions
    @ManyToMany
    @JoinTable(
            name = "user_permission",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> extraPermissions = new HashSet<>();

    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Ticket> tickets = new HashSet<>();

    // Constructors
    public AppUser() {
    }

    public AppUser(String firstName, String lastName, String phone, String email, String password, String description, boolean status, LocalDateTime createdAt, LocalDateTime updatedAt, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
    }
}
