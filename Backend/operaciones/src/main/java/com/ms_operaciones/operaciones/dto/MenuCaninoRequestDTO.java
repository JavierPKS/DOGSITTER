package com.ms_operaciones.operaciones.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MenuCaninoRequestDTO {

    @NotNull(message = "El idEvento es obligatorio")
    private Integer idEvento;

    @Min(value = 0, message = "El número de perros pequeños no puede ser negativo")
    private int perrosPequenos;

    @Min(value = 0, message = "El número de perros medianos no puede ser negativo")
    private int perrosMedianos;

    @Min(value = 0, message = "El número de perros grandes no puede ser negativo")
    private int perrosGrandes;

    private Integer idTipoTorta;
}
