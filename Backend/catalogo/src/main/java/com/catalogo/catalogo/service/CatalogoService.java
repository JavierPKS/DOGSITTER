package com.catalogo.catalogo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.catalogo.catalogo.model.*;
import com.catalogo.catalogo.repository.*;

@Service
public class CatalogoService {

    @Autowired
    private EspecieRepository especieRepository;
    @Autowired
    private TamanoMascotaRepository tamanoMascotaRepository;
    @Autowired
    private TematicaRepository tematicaRepository;
    @Autowired
    private LugarRepository lugarRepository;
    @Autowired
    private CargoRepository cargoRepository;


    public List<Especie> listarEspecies() { return especieRepository.findAll(); }
    public Especie guardarEspecie(Especie e) { return especieRepository.save(e); }


    public List<TamanoMascota> listarTamanos() { return tamanoMascotaRepository.findAll(); }
    public TamanoMascota guardarTamano(TamanoMascota t) { return tamanoMascotaRepository.save(t); }

 
    public List<Tematica> listarTematicas() { return tematicaRepository.findAll(); }
    public Tematica guardarTematica(Tematica t) { return tematicaRepository.save(t); }

  
    public List<Lugar> listarLugares() { return lugarRepository.findAll(); }
    public Lugar guardarLugar(Lugar l) { return lugarRepository.save(l); }

  
    public List<Cargo> listarCargos() { return cargoRepository.findAll(); }
    public Cargo guardarCargo(Cargo c) { return cargoRepository.save(c); }
}