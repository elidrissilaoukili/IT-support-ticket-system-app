package com.ecomirror.ecomirror.authentication.controller;

import com.ecomirror.ecomirror.authentication.dto.RegisterDTO;
import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;
import com.ecomirror.ecomirror.authentication.repository.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    private final RoleRepository roleRepository;
    private final AppUserRepository appUserRepository;

    public RegisterController(RoleRepository roleRepository, AppUserRepository appUserRepository) {
        this.roleRepository = roleRepository;
        this.appUserRepository = appUserRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO, BindingResult result) {
        // Validate password match
        if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
            result.addError(
                    new FieldError("registerDTO", "confirmPassword", "Passwords do not match")
            );
        }

        // Check if email is already in use
        if (appUserRepository.findByEmail(registerDTO.getEmail()) != null) {
            result.addError(
                    new FieldError("registerDTO", "email", "Email already in use")
            );
        }

        // Return validation errors if any
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Validation failed",
                    "errors", errors
            ));
        }

        try {
            var bCryptPasswordEncoder = new BCryptPasswordEncoder();
            AppUser newUser = new AppUser();
            newUser.setEmail(registerDTO.getEmail());
            newUser.setCreatedAt(LocalDateTime.now());
            newUser.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));

            // Fetch the default role (e.g., ITSUPPORT)
            Role defaultRole = roleRepository.findByName(RoleEnum.ITSUPPORT);
            if (defaultRole == null) {
                throw new RuntimeException("Role CLIENT not found. Ensure roles exist in the database.");
            }

            // Assign the role directly (without RolePermission)
            newUser.setRole(defaultRole);

            // Save the new user
            appUserRepository.save(newUser);

            // Return success response
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Registration successful",
                    "data", Map.of(
                            "id", newUser.getId(),
                            "email", newUser.getEmail(),
                            "createdAt", newUser.getCreatedAt()
                    )
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "An error occurred during registration",
                    "error", e.getMessage()
            ));
        }
    }
}