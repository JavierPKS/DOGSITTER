package com.ms_operaciones.operaciones.service;

import com.ms_operaciones.operaciones.dto.IncidenteRequestDTO;
import com.ms_operaciones.operaciones.entity.EventoStaff;
import com.ms_operaciones.operaciones.entity.Incidente;
import com.ms_operaciones.operaciones.entity.TipoIncidente;
import com.ms_operaciones.operaciones.repository.EventoStaffRepository;
import com.ms_operaciones.operaciones.repository.IncidenteRepository;
import com.ms_operaciones.operaciones.repository.TipoIncidenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentesService {

    private final IncidenteRepository incidenteRepository;
    private final EventoStaffRepository eventoStaffRepository;
    private final TipoIncidenteRepository tipoIncidenteRepository;

    @Transactional
    public Incidente registrarIncidente(IncidenteRequestDTO request) {
        EventoStaff eventoStaff = eventoStaffRepository
                .findByIdEventoAndIdEmpleado(request.getIdEvento(), request.getIdEmpleadoStaff())
                .orElseThrow(
                        () -> new IllegalArgumentException("El empleado no está asignado a este evento o no existe"));

        TipoIncidente tipoIncidente = tipoIncidenteRepository.findById(request.getIdTipoIncidente())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de incidente inválido"));

        Incidente incidente = Incidente.builder()
                .idEvento(request.getIdEvento())
                .eventoStaff(eventoStaff)
                .tipoIncidente(tipoIncidente)
                .idMascota(request.getIdMascota())
                .descripcion(request.getDescripcion())
                .build();

        return incidenteRepository.save(incidente);
    }

    @Transactional(readOnly = true)
    public List<Incidente> obtenerIncidentesPorEvento(Integer idEvento) {
        return incidenteRepository.findByIdEvento(idEvento);
    }
}
