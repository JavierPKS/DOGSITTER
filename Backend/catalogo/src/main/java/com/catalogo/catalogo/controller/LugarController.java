package com.catalogo.catalogo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.catalogo.catalogo.model.Lugar;
import com.catalogo.catalogo.service.CatalogoService;

@RestController
@RequestMapping("/api/catalogo/lugares")
public class LugarController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping
    public List<Lugar> listar() {
        return catalogoService.listarLugares();
    }

    @PostMapping
    public Lugar crear(@RequestBody Lugar lugar) {
        return catalogoService.guardarLugar(lugar);
    }
}