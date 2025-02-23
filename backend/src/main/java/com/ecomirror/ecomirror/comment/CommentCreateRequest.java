package com.ecomirror.ecomirror.comment;

import com.ecomirror.ecomirror.ticket.Ticket;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class CommentCreateRequest {

    @NotBlank(message = "Comment cannot be blank.")
    private String comment;

    private Long ticketId;
}
