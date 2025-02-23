package com.ecomirror.ecomirror.ticket.requests;

import com.ecomirror.ecomirror.ticket.enums.TicketStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketUpdateRequest extends TicketCreateRequest {

    @NotNull
    private TicketStatusEnum status;
}
