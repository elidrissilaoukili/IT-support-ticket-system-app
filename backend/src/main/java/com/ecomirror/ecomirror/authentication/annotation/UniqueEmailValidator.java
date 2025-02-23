package com.ecomirror.ecomirror.authentication.annotation;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    private final AppUserRepository appUserRepository;

    public UniqueEmailValidator(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.isBlank()) {
            return true; // Allow update if email is not provided
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            return false;
        }

        AppUser currentUser = appUserRepository.findByEmail(authentication.getName());
        if (currentUser != null && email.equals(currentUser.getEmail())) {
            return true; // Allow if email is unchanged
        }

        return !appUserRepository.existsByEmail(email);
    }

}
