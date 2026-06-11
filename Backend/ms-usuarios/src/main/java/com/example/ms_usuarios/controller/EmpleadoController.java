package com.example.ms_usuarios.controller;

import com.example.ms_usuarios.dto.EmpleadoRequestDTO;
import com.example.ms_usuarios.dto.EmpleadoResponseDTO;
import com.example.ms_usuarios.service.EmpleadoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/empleados")
@RequiredArgsConstructor
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    @PostMapping
    public ResponseEntity<EmpleadoResponseDTO> crear(@Valid @RequestBody EmpleadoRequestDTO dto) {
        EmpleadoResponseDTO creado = empleadoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public List<EmpleadoResponseDTO> listar() {
        return empleadoService.findAll();
    }

    @GetMapping("/{id}")
    public EmpleadoResponseDTO obtener(@PathVariable Integer id) {
        return empleadoService.findById(id);
    }

    @GetMapping("/disponibles")
    public List<EmpleadoResponseDTO> listarDisponibles() {
        return empleadoService.findDisponibles();
    }
}