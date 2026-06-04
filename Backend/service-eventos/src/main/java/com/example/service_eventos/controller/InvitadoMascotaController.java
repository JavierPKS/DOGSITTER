package com.example.service_eventos.controller;

import com.example.service_eventos.model.InvitadoMascota;
import com.example.service_eventos.service.InvitadoMascotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/invitados")
@RequiredArgsConstructor
public class InvitadoMascotaController {

    private final InvitadoMascotaService service;

    @PostMapping
    public ResponseEntity<InvitadoMascota> agregar(@RequestBody InvitadoMascota inv) {
        return ResponseEntity.ok(service.agregarInvitado(inv));
    }

    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<List<InvitadoMascota>> porEvento(@PathVariable Long idEvento) {
        return ResponseEntity.ok(service.listarPorEvento(idEvento));
    }

    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<InvitadoMascota> confirmar(@PathVariable Long id) {
        return ResponseEntity.ok(service.confirmarAsistencia(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminarInvitado(id);
        return ResponseEntity.noContent().build();
    }
}