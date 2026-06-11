package com.example.ms_usuarios.controller;

import com.example.ms_usuarios.dto.ClienteRequestDTO;
import com.example.ms_usuarios.dto.ClienteResponseDTO;
import com.example.ms_usuarios.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> crear(@Valid @RequestBody ClienteRequestDTO dto) {
        ClienteResponseDTO creado = clienteService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public List<ClienteResponseDTO> listar() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public ClienteResponseDTO obtener(@PathVariable Integer id) {
        return clienteService.findById(id);
    }
}