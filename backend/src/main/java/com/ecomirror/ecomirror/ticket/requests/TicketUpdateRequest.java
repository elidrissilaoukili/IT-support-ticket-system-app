package com.ecomirror.ecomirror.ticket;

import com.ecomirror.ecomirror.ticket.enums.CategoryEnum;
import com.ecomirror.ecomirror.ticket.enums.PriorityEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TicketCreateRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private PriorityEnum priority;

    @NotNull
    private CategoryEnum category;

    @NotNull
    private LocalDateTime createAt;

}
