package com.ms_operaciones.operaciones.controller;

import com.ms_operaciones.operaciones.dto.MinutaFinalResponseDTO;
import com.ms_operaciones.operaciones.service.MinutaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Expone los endpoints de la Minuta Final.
 *
 * POST /api/v1/minutas/generar/{idEvento}  → Genera (o regenera) la minuta y devuelve el DTO completo.
 * GET  /api/v1/minutas/evento/{idEvento}   → Devuelve la minuta ya persistida para vista de impresión.
 */
@RestController
@RequestMapping("/api/v1/minutas")
@RequiredArgsConstructor
public class MinutaController {

    private final MinutaService minutaService;

    /**
     * Genera la minuta final del evento consolidando menú, staff e incidentes.
     * El frontend llama a este endpoint cuando el usuario presiona "Generar Minuta".
     */
    @PostMapping("/generar/{idEvento}")
    public ResponseEntity<MinutaFinalResponseDTO> generarMinuta(
            @PathVariable Integer idEvento) {
        MinutaFinalResponseDTO response = minutaService.generarMinuta(idEvento);
        return ResponseEntity.ok(response);
    }

    /**
     * Recupera la minuta ya generada de un evento.
     * Útil para reimprimir sin recalcular.
     */
    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<MinutaFinalResponseDTO> obtenerMinuta(
            @PathVariable Integer idEvento) {
        MinutaFinalResponseDTO response = minutaService.obtenerMinuta(idEvento);
        return ResponseEntity.ok(response);
    }
}
