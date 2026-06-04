package com.ms_operaciones.operaciones.controller;

import com.ms_operaciones.operaciones.dto.MarcajeTurnoRequestDTO;
import com.ms_operaciones.operaciones.entity.MarcajeTurno;
import com.ms_operaciones.operaciones.service.TurnosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/turnos")
@RequiredArgsConstructor
public class TurnosController {

    private final TurnosService turnosService;

    @PostMapping("/inicio")
    public ResponseEntity<MarcajeTurno> registrarInicioTurno(
            @Valid @RequestBody MarcajeTurnoRequestDTO request) {
        MarcajeTurno response = turnosService.registrarInicioTurno(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{idMarcaje}/fin")
    public ResponseEntity<MarcajeTurno> registrarFinTurno(
            @PathVariable Integer idMarcaje) {
        MarcajeTurno response = turnosService.registrarFinTurno(idMarcaje);
        return ResponseEntity.ok(response);
    }
}
