package com.ms_operaciones.operaciones.controller;

import com.ms_operaciones.operaciones.dto.MenuCaninoRequestDTO;
import com.ms_operaciones.operaciones.dto.MenuHumanoRequestDTO;
import com.ms_operaciones.operaciones.entity.MenuCanino;
import com.ms_operaciones.operaciones.entity.MenuHumano;
import com.ms_operaciones.operaciones.service.GastronomiaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gastronomia")
@RequiredArgsConstructor
public class GastronomiaController {

    private final GastronomiaService gastronomiaService;

    @PostMapping("/menu-canino")
    public ResponseEntity<MenuCanino> calcularMenuCanino(
            @Valid @RequestBody MenuCaninoRequestDTO request) {
        MenuCanino response = gastronomiaService.calcularYGuardarMenuCanino(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/menu-humano")
    public ResponseEntity<MenuHumano> calcularMenuHumano(
            @Valid @RequestBody MenuHumanoRequestDTO request) {
        MenuHumano response = gastronomiaService.calcularYGuardarMenuHumano(request);
        return ResponseEntity.ok(response);
    }
}
