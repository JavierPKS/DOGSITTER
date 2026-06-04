package com.ms_operaciones.operaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IncidenteRequestDTO {

    @NotNull(message = "El idEvento es obligatorio")
    private Integer idEvento;

    @NotNull(message = "El idEmpleado que reporta (staff) es obligatorio")
    private Integer idEmpleadoStaff;

    @NotNull(message = "El idTipoIncidente es obligatorio")
    private Integer idTipoIncidente;

    private Integer idMascota; // Opcional

    @NotBlank(message = "La descripción no puede estar en blanco")
    private String descripcion;
}
