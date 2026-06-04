package com.ms_operaciones.operaciones.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StaffAssignmentResponseDTO {
    private int cantidadCoordinador;
    private int cantidadMonitorCanino;
    private int cantidadGarzon;
    private int cantidadVeterinario;
}
