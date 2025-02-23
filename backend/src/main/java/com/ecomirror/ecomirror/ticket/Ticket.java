package com.ecomirror.ecomirror.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;
    private String description;
    private String priority;
    private String category;
    private LocalDateTime createAt;

(Low, Medium, High)
(Network, Hardware, Software, Other)

}
