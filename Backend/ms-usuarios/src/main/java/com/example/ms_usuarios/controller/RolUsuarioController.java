package com.example.ms_usuarios.controller;

import com.example.ms_usuarios.dto.RolUsuarioDTO;
import com.example.ms_usuarios.service.RolUsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios/roles")
@RequiredArgsConstructor
public class RolUsuarioController {

    private final RolUsuarioService rolUsuarioService;

    @GetMapping
    public List<RolUsuarioDTO> listar() {
        return rolUsuarioService.findAll();
    }
}