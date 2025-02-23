package com.ecomirror.ecomirror.authentication.controller;

import com.ecomirror.ecomirror.authentication.dto.RegisterDTO;
import com.ecomirror.ecomirror.authentication.dto.UserResponseDTO;
import com.ecomirror.ecomirror.authentication.dto.UserUpdateRequest;
import com.ecomirror.ecomirror.authentication.service.EmployeesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/employees")
public class EmployeesController {

    private final EmployeesService employeesService;

    public EmployeesController(EmployeesService employeesService) {
        this.employeesService = employeesService;
    }

    @PostMapping("")
    public ResponseEntity<?> storeEmployees(@Valid @RequestBody RegisterDTO registerDTO, BindingResult result) {
        ResponseEntity response = employeesService.storeEmployees(registerDTO, result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public UserResponseDTO getEmployeesById(@PathVariable Long id) {
        return employeesService.findById(id);
    }

    @PutMapping("/{id}")
    public UserResponseDTO editEmployees(@PathVariable Long id, @RequestBody UserUpdateRequest userUpdateRequest) {
        return employeesService.findById(id);
    }

    @DeleteMapping("/{id}")
    public UserResponseDTO deleteEmployee(@PathVariable Long id) {
        return employeesService.deleteEmployee(id);
    }


    @GetMapping("")
    public List<UserResponseDTO> getAllEmployees() {
        return employeesService.getAllEmployees();
    }

    @DeleteMapping("")
    public String deleteAllEmployees() {
        return "Hello World";
    }
}
