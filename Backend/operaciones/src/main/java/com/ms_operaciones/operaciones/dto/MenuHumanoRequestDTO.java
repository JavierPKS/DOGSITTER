package com.ms_operaciones.operaciones.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MenuHumanoRequestDTO {

    @NotNull(message = "El idEvento es obligatorio")
    private Integer idEvento;

    @Min(value = 0, message = "El total de humanos no puede ser negativo")
    private int totalHumanos;
}
