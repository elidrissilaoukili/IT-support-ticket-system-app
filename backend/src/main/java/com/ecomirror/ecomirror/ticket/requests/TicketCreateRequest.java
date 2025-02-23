package com.ecomirror.ecomirror.ticket.requests;

import com.ecomirror.ecomirror.ticket.enums.CategoryEnum;
import com.ecomirror.ecomirror.ticket.enums.PriorityEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketCreateRequest {

    @NotBlank(message = "title is required")
    private String title;

    @NotBlank(message = "description is required")
    private String description;

    @NotNull(message = "priority is required")
    private PriorityEnum priority;

    @NotNull(message = "category is required")
    private CategoryEnum category;
}
