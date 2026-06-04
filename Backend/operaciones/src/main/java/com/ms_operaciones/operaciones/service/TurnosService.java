package com.ms_operaciones.operaciones.service;

import com.ms_operaciones.operaciones.dto.MarcajeTurnoRequestDTO;
import com.ms_operaciones.operaciones.entity.EventoStaff;
import com.ms_operaciones.operaciones.entity.MarcajeTurno;
import com.ms_operaciones.operaciones.repository.EventoStaffRepository;
import com.ms_operaciones.operaciones.repository.MarcajeTurnoRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TurnosService {

    private final MarcajeTurnoRepository marcajeTurnoRepository;
    private final EventoStaffRepository eventoStaffRepository;

    @Transactional
    public MarcajeTurno registrarInicioTurno(MarcajeTurnoRequestDTO request) {
        EventoStaff eventoStaff = eventoStaffRepository
                .findByIdEventoAndIdEmpleado(request.getIdEvento(), request.getIdEmpleado())
                .orElseThrow(() -> new IllegalArgumentException("El empleado no está asignado a este evento"));

        MarcajeTurno marcaje = MarcajeTurno.builder()
                .eventoStaff(eventoStaff)
                .inicioTurno(LocalDateTime.now())
                .build();

        return marcajeTurnoRepository.save(marcaje);
    }

    @Transactional
    public MarcajeTurno registrarFinTurno(Integer idMarcaje) {
        MarcajeTurno marcaje = marcajeTurnoRepository.findById(idMarcaje)
                .orElseThrow(() -> new IllegalArgumentException("El marcaje de turno no existe"));

        if (marcaje.getFinTurno() != null) {
            throw new IllegalStateException("El turno ya fue finalizado");
        }

        marcaje.setFinTurno(LocalDateTime.now());
        return marcajeTurnoRepository.save(marcaje);
    }
}
