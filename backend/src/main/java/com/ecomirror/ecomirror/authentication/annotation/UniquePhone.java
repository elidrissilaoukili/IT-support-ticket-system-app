package com.ecomirror.ecomirror.authentication.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniquePhoneValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniquePhone {
    String message() default "Phone number must be unique";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
