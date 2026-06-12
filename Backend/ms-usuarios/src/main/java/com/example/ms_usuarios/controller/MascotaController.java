package com.example.ms_usuarios.controller;

import com.example.ms_usuarios.dto.MascotaRequestDTO;
import com.example.ms_usuarios.dto.MascotaResponseDTO;
import com.example.ms_usuarios.service.MascotaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mascotas")
@RequiredArgsConstructor
public class MascotaController {

    private final MascotaService mascotaService;

    @PostMapping
    public ResponseEntity<MascotaResponseDTO> crear(@Valid @RequestBody MascotaRequestDTO dto) {
        MascotaResponseDTO creada = mascotaService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @GetMapping
    public List<MascotaResponseDTO> listar() {
        return mascotaService.findAll();
    }

    @GetMapping("/{id}")
    public MascotaResponseDTO obtener(@PathVariable Integer id) {
        return mascotaService.findById(id);
    }

    @GetMapping("/cliente/{idCliente}")
    public List<MascotaResponseDTO> listarPorCliente(@PathVariable Integer idCliente) {
        return mascotaService.findByCliente(idCliente);
    }
}