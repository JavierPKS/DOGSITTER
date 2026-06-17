package com.example.service_eventos;

import com.example.service_eventos.model.Evento;
import com.example.service_eventos.repository.EventoRepository;
import com.example.service_eventos.service.EventoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventosServiceTest {
    @Mock
    private EventoRepository eventoRepository;
    @Mock
    private WebClient webClient;
    @InjectMocks
    private EventoService eventoService;

    @Test
    void testCrearEvento() {
        Evento evento = new Evento();
        when(eventoRepository.save(any(Evento.class))).thenReturn(evento);
        Evento result = eventoService.crearEvento(evento);
        assertNotNull(result);
        verify(eventoRepository, times(1)).save(evento);
    }

    @Test
    void testListarEventos() {
        Evento evento1 = new Evento();
        Evento evento2 = new Evento();
        when(eventoRepository.findByDeletedAtIsNull()).thenReturn(Arrays.asList(evento1, evento2));
        List<Evento> result = eventoService.listarEventos();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(eventoRepository, times(1)).findByDeletedAtIsNull();
    }

    @Test
    void testBuscarPorId() {
        Evento eventoExistente = new Evento();
        eventoExistente.setIdEvento(1L);
        when(eventoRepository.findById(1L)).thenReturn(Optional.of(eventoExistente));
        Optional<Evento> result = eventoService.buscarPorId(1L);
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getIdEvento());
        verify(eventoRepository, times(1)).findById(1L);
        verify(webClient, times(2)).get();
    }

    @Test
    void testBuscarPorCliente() {
        Evento evento = new Evento();
        when(eventoRepository.findByIdCliente(1L)).thenReturn(Arrays.asList(evento));
        List<Evento> result = eventoService.buscarPorCliente(1L);
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventoRepository, times(1)).findByIdCliente(1L);
    }

    @Test
    void testActualizarEvento() {
        Evento eventoExistente = new Evento();
        eventoExistente.setIdEvento(1L);

        Evento datos = new Evento();
        datos.setFechaEvento(LocalDate.now());
        datos.setHoraInicio(LocalTime.of(10, 0));
        datos.setHoraFin(LocalTime.of(12, 0));
        datos.setNumHumanos(5);

        when(eventoRepository.findById(1L)).thenReturn(Optional.of(eventoExistente));
        when(eventoRepository.save(any(Evento.class))).thenReturn(eventoExistente);
        Evento result = eventoService.actualizarEvento(1L, datos);
        assertNotNull(result);
        verify(eventoRepository, times(1)).findById(1L);
        verify(eventoRepository, times(1)).save(eventoExistente);
    }

    @Test
    void testEliminarEvento() {
        Evento evento = new Evento();
        when(eventoRepository.findById(1L)).thenReturn(Optional.of(evento));
        eventoService.eliminarEvento(1L);
        assertNotNull(evento.getDeletedAt());
        verify(eventoRepository, times(1)).findById(1L);
        verify(eventoRepository, times(1)).save(evento);
    }
}