package com.ecomirror.ecomirror.authentication.annotation;

import com.ecomirror.ecomirror.authentication.dto.PasswordChangeRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatch, PasswordChangeRequest> {

    @Override
    public void initialize(PasswordsMatch constraintAnnotation) {
    }

    @Override
    public boolean isValid(PasswordChangeRequest request, ConstraintValidatorContext context) {
        return request.getNewPassword().equals(request.getConfirmNewPassword());
    }
}
