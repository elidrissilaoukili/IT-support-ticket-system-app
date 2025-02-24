package com.ecomirror.ecomirror.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentCreateRequest {

    @NotBlank(message = "Comment cannot be blank.")
    private String comment;

    private Long ticketId;
}
