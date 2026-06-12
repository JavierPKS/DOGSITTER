package com.example.ms_usuarios.controller;

import com.example.ms_usuarios.dto.CargoDTO;
import com.example.ms_usuarios.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/empleados/cargos")
@RequiredArgsConstructor
public class CargoController {

    private final CargoService cargoService;

    @GetMapping
    public List<CargoDTO> listar() {
        return cargoService.findAll();
    }
}