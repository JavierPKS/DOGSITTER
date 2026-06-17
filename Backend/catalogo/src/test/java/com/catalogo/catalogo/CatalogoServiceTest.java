package com.catalogo.catalogo;

import com.catalogo.catalogo.model.*;
import com.catalogo.catalogo.repository.*;
import com.catalogo.catalogo.service.CatalogoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CatalogoServiceTest {

    @Mock
    private EspecieRepository especieRepository;
    @Mock
    private TamanoMascotaRepository tamanoMascotaRepository;
    @Mock
    private TematicaRepository tematicaRepository;
    @Mock
    private LugarRepository lugarRepository;
    @Mock
    private CargoRepository cargoRepository;

    @InjectMocks
    private CatalogoService catalogoService;

    @Test
    void testListarEspecies() {
        Especie especie1 = new Especie();
        Especie especie2 = new Especie();
        when(especieRepository.findAll()).thenReturn(Arrays.asList(especie1, especie2));

        List<Especie> result = catalogoService.listarEspecies();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(especieRepository, times(1)).findAll();
    }

    @Test
    void testGuardarEspecie() {
        Especie especie = new Especie();
        when(especieRepository.save(any(Especie.class))).thenReturn(especie);

        Especie result = catalogoService.guardarEspecie(especie);

        assertNotNull(result);
        verify(especieRepository, times(1)).save(especie);
    }

    @Test
    void testListarTamanos() {
        TamanoMascota t1 = new TamanoMascota();
        TamanoMascota t2 = new TamanoMascota();
        when(tamanoMascotaRepository.findAll()).thenReturn(Arrays.asList(t1, t2));

        List<TamanoMascota> result = catalogoService.listarTamanos();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(tamanoMascotaRepository, times(1)).findAll();
    }

    @Test
    void testGuardarTamano() {
        TamanoMascota t = new TamanoMascota();
        when(tamanoMascotaRepository.save(any(TamanoMascota.class))).thenReturn(t);

        TamanoMascota result = catalogoService.guardarTamano(t);

        assertNotNull(result);
        verify(tamanoMascotaRepository, times(1)).save(t);
    }

    @Test
    void testListarTematicas() {
        Tematica t1 = new Tematica();
        Tematica t2 = new Tematica();
        when(tematicaRepository.findAll()).thenReturn(Arrays.asList(t1, t2));

        List<Tematica> result = catalogoService.listarTematicas();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(tematicaRepository, times(1)).findAll();
    }

    @Test
    void testGuardarTematica() {
        Tematica t = new Tematica();
        when(tematicaRepository.save(any(Tematica.class))).thenReturn(t);

        Tematica result = catalogoService.guardarTematica(t);

        assertNotNull(result);
        verify(tematicaRepository, times(1)).save(t);
    }

    @Test
    void testListarLugares() {
        Lugar l1 = new Lugar();
        Lugar l2 = new Lugar();
        when(lugarRepository.findAll()).thenReturn(Arrays.asList(l1, l2));

        List<Lugar> result = catalogoService.listarLugares();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(lugarRepository, times(1)).findAll();
    }

    @Test
    void testGuardarLugar() {
        Lugar l = new Lugar();
        when(lugarRepository.save(any(Lugar.class))).thenReturn(l);

        Lugar result = catalogoService.guardarLugar(l);

        assertNotNull(result);
        verify(lugarRepository, times(1)).save(l);
    }

    @Test
    void testListarCargos() {
        Cargo c1 = new Cargo();
        Cargo c2 = new Cargo();
        when(cargoRepository.findAll()).thenReturn(Arrays.asList(c1, c2));

        List<Cargo> result = catalogoService.listarCargos();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(cargoRepository, times(1)).findAll();
    }

    @Test
    void testGuardarCargo() {
        Cargo c = new Cargo();
        when(cargoRepository.save(any(Cargo.class))).thenReturn(c);

        Cargo result = catalogoService.guardarCargo(c);

        assertNotNull(result);
        verify(cargoRepository, times(1)).save(c);
    }
}
