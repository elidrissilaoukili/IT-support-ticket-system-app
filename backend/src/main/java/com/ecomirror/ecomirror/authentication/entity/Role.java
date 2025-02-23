package com.ecomirror.ecomirror.authentication.entity;

import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleEnum name;

    private boolean status = Boolean.TRUE;
    private String description;

    @ManyToMany
    @JoinTable(
            name = "role_permission",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();

    // Constructors
    public Role() {
    }

    public Role(RoleEnum name) {
        this.name = name;
    }

    public Role(RoleEnum name, boolean status, String description) {
        this.name = name;
        this.status = status;
        this.description = description;
    }
}
