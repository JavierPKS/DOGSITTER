package com.ms_operaciones.operaciones.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MarcajeTurnoRequestDTO {

    @NotNull(message = "El idEvento es obligatorio")
    private Integer idEvento;

    @NotNull(message = "El idEmpleado es obligatorio")
    private Integer idEmpleado;
}
