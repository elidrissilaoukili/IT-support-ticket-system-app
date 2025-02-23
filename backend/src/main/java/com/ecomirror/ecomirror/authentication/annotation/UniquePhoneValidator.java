package com.ecomirror.ecomirror.authentication.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;

@Component
public class UniquePhoneValidator implements ConstraintValidator<UniquePhone, String> {

    private final AppUserRepository appUserRepository;

    public UniquePhoneValidator(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.isBlank()) {
            return true;
        }

        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            return false;
        }

        // Find user by authentication email
        AppUser currentUser = appUserRepository.findByEmail(authentication.getName());
        if (currentUser != null && phone.equals(currentUser.getPhone())) {
            return true; // Allow if the phone is unchanged
        }

        // Check if phone is already taken by another user
        return !appUserRepository.existsByPhone(phone);
    }
}
