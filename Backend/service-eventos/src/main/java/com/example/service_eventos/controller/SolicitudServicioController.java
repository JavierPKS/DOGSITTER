package com.example.service_eventos.controller;

import com.example.service_eventos.model.SolicitudServicio;
import com.example.service_eventos.service.SolicitudServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/solicitudes")
@RequiredArgsConstructor
public class SolicitudServicioController {

    private final SolicitudServicioService service;

    @PostMapping
    public ResponseEntity<SolicitudServicio> agregar(@RequestBody SolicitudServicio sol) {
        return ResponseEntity.ok(service.agregarSolicitud(sol));
    }

    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<List<SolicitudServicio>> porEvento(@PathVariable Long idEvento) {
        return ResponseEntity.ok(service.listarPorEvento(idEvento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminarSolicitud(id);
        return ResponseEntity.noContent().build();
    }
}