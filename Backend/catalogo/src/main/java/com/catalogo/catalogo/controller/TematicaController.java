package com.catalogo.catalogo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.catalogo.catalogo.model.Tematica;
import com.catalogo.catalogo.service.CatalogoService;

@RestController
@RequestMapping("/api/catalogo/tematicas")
public class TematicaController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping
    public List<Tematica> listar() {
        return catalogoService.listarTematicas();
    }

    @PostMapping
    public Tematica crear(@RequestBody Tematica tematica) {
        return catalogoService.guardarTematica(tematica);
    }
}