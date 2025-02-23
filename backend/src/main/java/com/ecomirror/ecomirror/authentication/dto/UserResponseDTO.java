package com.ecomirror.ecomirror.authentication.dto;

import java.util.Set;

import com.ecomirror.ecomirror.authentication.entity.AppUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;


    public UserResponseDTO(AppUser user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.role = user.getRole() != null ? user.getRole().getName().name() : null;
    }


}
