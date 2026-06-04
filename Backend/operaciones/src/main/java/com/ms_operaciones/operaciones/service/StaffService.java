package com.ms_operaciones.operaciones.service;

import org.springframework.stereotype.Service;

import com.ms_operaciones.operaciones.dto.StaffAssignmentRequestDTO;
import com.ms_operaciones.operaciones.dto.StaffAssignmentResponseDTO;

@Service
public class StaffService {

    /**
     * Calcula la cantidad de personal requerida para un evento basándose en las
     * reglas de negocio.
     * Reglas:
     * - Coordinador = 1 fijo
     * - Monitor canino = CEIL(N_perros / 5), mínimo 1 si hay perros
     * - Garzón = CEIL(N_humanos / 10), mínimo 1 si hay humanos
     * - Veterinario Guardia = 1 obligatorio
     *
     * @param request Datos de cantidad de asistentes
     * @return StaffAssignmentResponseDTO con la cantidad de cada rol
     */
    public StaffAssignmentResponseDTO calcularStaffRequerido(StaffAssignmentRequestDTO request) {

        int cantidadCoordinador = 1; // Fijo
        int cantidadVeterinario = 1; // Obligatorio

        int cantidadMonitorCanino = 0;
        if (request.getNumPerros() > 0) {
            // Aplicar sugerencia del usuario: Math.max(1, Math.ceil(n/X))
            cantidadMonitorCanino = Math.max(1, (int) Math.ceil((double) request.getNumPerros() / 5.0));
        }

        int cantidadGarzon = 0;
        if (request.getNumHumanos() > 0) {
            // Aplicar sugerencia del usuario: Math.max(1, Math.ceil(n/X))
            cantidadGarzon = Math.max(1, (int) Math.ceil((double) request.getNumHumanos() / 10.0));
        }

        return StaffAssignmentResponseDTO.builder()
                .cantidadCoordinador(cantidadCoordinador)
                .cantidadMonitorCanino(cantidadMonitorCanino)
                .cantidadGarzon(cantidadGarzon)
                .cantidadVeterinario(cantidadVeterinario)
                .build();
    }
}
