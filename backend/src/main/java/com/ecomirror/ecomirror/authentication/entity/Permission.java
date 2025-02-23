package com.ecomirror.ecomirror.authentication.entity;

import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private PermissionEnum name;

    private boolean status = Boolean.TRUE;
    private String description;

    // Mapping with Role
    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new HashSet<>();

    // Mapping with AppUser for extra permissions
    @ManyToMany(mappedBy = "extraPermissions")
    private Set<AppUser> users = new HashSet<>();

    // Constructors
    public Permission() {
    }

    public Permission(PermissionEnum name) {
        this.name = name;
    }

    public Permission(boolean status, String description, PermissionEnum name) {
        this.name = name;
        this.status = status;
        this.description = description;
    }
}
