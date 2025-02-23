package com.ecomirror.ecomirror.authentication.dto;

import com.ecomirror.ecomirror.authentication.annotation.PasswordsMatch;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@PasswordsMatch
public class PasswordChangeRequest {

    @NotBlank
    @Size(min = 6, max = 50, message = "Minimum password length is 6 chars")
    private String oldPassword;

    @NotBlank
    @Size(min = 6, max = 50, message = "Minimum password length is 6 chars")
    private String newPassword;

    @NotBlank
    private String confirmNewPassword;

    // Getters and setters
}
