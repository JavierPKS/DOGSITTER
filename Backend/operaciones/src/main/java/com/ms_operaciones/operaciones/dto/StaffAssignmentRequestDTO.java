package com.ms_operaciones.operaciones.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StaffAssignmentRequestDTO {

    @NotNull(message = "El idEvento es obligatorio")
    private Integer idEvento;

    @Min(value = 0, message = "El número de perros no puede ser negativo")
    private int numPerros;

    @Min(value = 0, message = "El número de humanos no puede ser negativo")
    private int numHumanos;
}
