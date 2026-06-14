package com.catalogo.catalogo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.catalogo.catalogo.model.Especie;
import com.catalogo.catalogo.service.CatalogoService;

@RestController
@RequestMapping("/api/v1/catalogo/especies")
public class EspecieController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping
    public List<Especie> listar() {
        return catalogoService.listarEspecies();
    }

    @PostMapping
    public Especie crear(@RequestBody Especie especie) {
        return catalogoService.guardarEspecie(especie);
    }
}