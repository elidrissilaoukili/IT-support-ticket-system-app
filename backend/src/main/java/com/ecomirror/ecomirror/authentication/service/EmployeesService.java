package com.ecomirror.ecomirror.authentication.service;

import com.ecomirror.ecomirror.authentication.dto.RegisterDTO;
import com.ecomirror.ecomirror.authentication.dto.UserResponseDTO;
import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.entity.Permission;
import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;
import com.ecomirror.ecomirror.authentication.repository.PermissionRepository;
import com.ecomirror.ecomirror.authentication.repository.RoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeesService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public EmployeesService(AppUserRepository appUserRepository, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public ResponseEntity<?> storeEmployees(RegisterDTO registerDTO, BindingResult result) {
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

            // Fetch the default role (e.g., EMPLOYEE)
            Role defaultRole = roleRepository.findByName(RoleEnum.EMPLOYEE);
            if (defaultRole == null) {
                throw new RuntimeException("Role EMPLOYEE not found. Ensure roles exist in the database.");
            }
            newUser.setRole(defaultRole);

            // Assign default permissions
            List<Permission> defaultPermissions = permissionRepository.findByNameIn(
                    List.of(PermissionEnum.CREATE_TICKET, PermissionEnum.VIEW_TICKET) // Fixed method call
            );

            if (defaultPermissions.isEmpty()) {
                throw new RuntimeException("Default permissions not found. Ensure permissions exist in the database.");
            }

            newUser.setExtraPermissions(new HashSet<>(defaultPermissions));

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

    public UserResponseDTO findById(Long id) {
        AppUser employee = appUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (employee.getRole().getName() != RoleEnum.EMPLOYEE) {
            throw new RuntimeException("Employee not found");
        }
        return new UserResponseDTO(employee);
    }

    public List<UserResponseDTO> getAllEmployees() {
        List<AppUser> employees = appUserRepository.findByRole(RoleEnum.EMPLOYEE);
        return employees.stream().map(UserResponseDTO::new).collect(Collectors.toList());
    }

    public UserResponseDTO deleteEmployee(Long id) {
        AppUser employee = appUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        appUserRepository.deleteById(id);
        return new UserResponseDTO(employee);
    }

}
