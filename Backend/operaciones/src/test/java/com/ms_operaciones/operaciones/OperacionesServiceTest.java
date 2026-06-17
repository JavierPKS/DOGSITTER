package com.ms_operaciones.operaciones;

import com.ms_operaciones.operaciones.dto.MenuCaninoRequestDTO;
import com.ms_operaciones.operaciones.dto.MenuHumanoRequestDTO;
import com.ms_operaciones.operaciones.entity.MenuCanino;
import com.ms_operaciones.operaciones.entity.MenuEvento;
import com.ms_operaciones.operaciones.entity.MenuHumano;
import com.ms_operaciones.operaciones.repository.BebestibleRepository;
import com.ms_operaciones.operaciones.repository.InsumoTortaRepository;
import com.ms_operaciones.operaciones.repository.MenuCaninoRepository;
import com.ms_operaciones.operaciones.repository.MenuEventoRepository;
import com.ms_operaciones.operaciones.repository.MenuHumanoRepository;
import com.ms_operaciones.operaciones.service.GastronomiaService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OperacionesServiceTest {
    @Mock
    private MenuEventoRepository menuEventoRepository;
    @Mock
    private MenuCaninoRepository menuCaninoRepository;
    @Mock
    private MenuHumanoRepository menuHumanoRepository;
    @Mock
    private BebestibleRepository bebestibleRepository;
    @Mock
    private InsumoTortaRepository insumoTortaRepository;
    @InjectMocks
    private GastronomiaService gastronomiaService;

    @Test
    void testCalcularYGuardarMenuCanino() {
        MenuCaninoRequestDTO request = new MenuCaninoRequestDTO();
        request.setIdEvento(1);
        request.setPerrosPequenos(2);
        request.setPerrosMedianos(1);
        request.setPerrosGrandes(1);
        request.setIdTipoTorta(1);
        MenuEvento menuEvento = new MenuEvento();
        menuEvento.setIdEvento(1);
        MenuCanino menuCanino = new MenuCanino();
        menuCanino.setTotalAlbondigas(11);
        when(menuEventoRepository.findByIdEvento(1)).thenReturn(Optional.of(menuEvento));
        when(menuCaninoRepository.save(any(MenuCanino.class))).thenReturn(menuCanino);
        MenuCanino result = gastronomiaService.calcularYGuardarMenuCanino(request);
        assertNotNull(result);
        verify(menuEventoRepository, times(1)).findByIdEvento(1);
        verify(menuCaninoRepository, times(1)).save(any(MenuCanino.class));
        verify(insumoTortaRepository, atLeastOnce()).save(any());
    }

    @Test
    void testCalcularYGuardarMenuHumano() {
        MenuHumanoRequestDTO request = new MenuHumanoRequestDTO();
        request.setIdEvento(1);
        request.setTotalHumanos(10);
        MenuEvento menuEvento = new MenuEvento();
        menuEvento.setIdEvento(1);
        MenuHumano menuHumano = new MenuHumano();
        menuHumano.setTotalHumanos(10);
        when(menuEventoRepository.findByIdEvento(1)).thenReturn(Optional.of(menuEvento));
        when(menuHumanoRepository.save(any(MenuHumano.class))).thenReturn(menuHumano);
        MenuHumano result = gastronomiaService.calcularYGuardarMenuHumano(request);
        assertNotNull(result);
        verify(menuEventoRepository, times(1)).findByIdEvento(1);
        verify(menuHumanoRepository, times(1)).save(any(MenuHumano.class));
        verify(bebestibleRepository, atLeastOnce()).save(any());
    }
}