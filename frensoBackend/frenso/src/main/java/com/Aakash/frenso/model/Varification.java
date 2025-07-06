package com.Aakash.frenso.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Embeddable
public class Varification {
    private boolean status = false;
    private LocalDateTime startedAt;
    private LocalDateTime endAt;
    private String planType;
}
