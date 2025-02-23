package com.ecomirror.ecomirror.authentication.dto;

import com.ecomirror.ecomirror.authentication.annotation.UniqueEmail;
import com.ecomirror.ecomirror.authentication.annotation.UniquePhone;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    @NotBlank
    @UniquePhone
    @Size(min = 9, max = 15)
    private String phone;

    @NotBlank
    @UniqueEmail
    @Size(max = 50)
    @Email(message = "Invalid email format")
    private String email;
}
