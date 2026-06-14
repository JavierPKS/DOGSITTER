package com.catalogo.catalogo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.catalogo.catalogo.model.Cargo;
import com.catalogo.catalogo.service.CatalogoService;

@RestController
@RequestMapping("/api/v1/catalogo/cargos")
public class CargoController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping
    public List<Cargo> listar() {
        return catalogoService.listarCargos();
    }

    @PostMapping
    public Cargo crear(@RequestBody Cargo cargo) {
        return catalogoService.guardarCargo(cargo);
    }
}