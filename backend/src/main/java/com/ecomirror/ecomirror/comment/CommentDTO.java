package com.ecomirror.ecomirror.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentDTO {

    private Long id;
    private String comment;
    private Long ticketId;  // Instead of the full ticket, just include the ticketId
    private String ticketTitle;  // You can also add specific ticket fields like title

    // Constructor to convert from Comment entity to CommentDTO
    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.comment = comment.getComment();
        this.ticketId = comment.getTicket().getId();
        this.ticketTitle = comment.getTicket().getTitle();
    }
}
