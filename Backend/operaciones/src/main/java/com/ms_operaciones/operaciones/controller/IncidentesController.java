package com.ms_operaciones.operaciones.controller;

import com.ms_operaciones.operaciones.dto.IncidenteRequestDTO;
import com.ms_operaciones.operaciones.entity.Incidente;
import com.ms_operaciones.operaciones.service.IncidentesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/incidentes")
@RequiredArgsConstructor
public class IncidentesController {

    private final IncidentesService incidentesService;

    @PostMapping
    public ResponseEntity<Incidente> registrarIncidente(
            @Valid @RequestBody IncidenteRequestDTO request) {
        Incidente response = incidentesService.registrarIncidente(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<List<Incidente>> obtenerIncidentesPorEvento(
            @PathVariable Integer idEvento) {
        List<Incidente> response = incidentesService.obtenerIncidentesPorEvento(idEvento);
        return ResponseEntity.ok(response);
    }
}
