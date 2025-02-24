package com.ecomirror.ecomirror.authentication.controller;

import com.ecomirror.ecomirror.authentication.dto.PasswordChangeRequest;
import com.ecomirror.ecomirror.authentication.dto.UserUpdateRequest;
import com.ecomirror.ecomirror.authentication.dto.UserResponseDTO;
import com.ecomirror.ecomirror.authentication.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/users")
public class AppUserController {

    private final AppUserService appUserService;

    // Inject the repository via constructor
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        UserResponseDTO responseDTO = appUserService.getAuthenticatedUser(email);
        return ResponseEntity.ok(responseDTO);
    }


    @PutMapping("/me")
    public ResponseEntity<?> updateAuthenticatedUser(@Valid @RequestBody UserUpdateRequest updatedUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        UserResponseDTO responseDTO = appUserService.updateUserProfile(email, updatedUser);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody PasswordChangeRequest updatedPassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        if (appUserService.updateUserPassword(email, updatedPassword)) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect or passwords do not match");
        }
    }

    @DeleteMapping("/destroy")
    public ResponseEntity<?> destroyAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        if (appUserService.destroyAuthenticatedUser(email)) {
            return ResponseEntity.ok("Your account deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your account can not be deleted at the moment");
        }
    }

}
