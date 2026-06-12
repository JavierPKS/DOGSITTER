package com.catalogo.catalogo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.catalogo.catalogo.model.TamanoMascota;
import com.catalogo.catalogo.service.CatalogoService;

@RestController
@RequestMapping("/api/catalogo/tamanos")
public class TamanoMascotaController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping
    public List<TamanoMascota> listar() {
        return catalogoService.listarTamanos();
    }

    @PostMapping
    public TamanoMascota crear(@RequestBody TamanoMascota tamano) {
        return catalogoService.guardarTamano(tamano);
    }
}