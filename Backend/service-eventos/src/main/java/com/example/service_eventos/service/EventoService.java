package com.example.service_eventos.service;

import com.example.service_eventos.model.Evento;
import com.example.service_eventos.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository eventoRepository;
    private final WebClient webClient;

    @Value("${microservicio.usuarios.url}")
    private String usuariosUrl;

    @Value("${microservicio.catalogo.url}")
    private String catalogoUrl;

    public Evento crearEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findByDeletedAtIsNull();
    }

    public Optional<Evento> buscarPorId(Long id) {
        Optional<Evento> opt = eventoRepository.findById(id);
        opt.ifPresent(evento -> {
            try {
                Object cliente = webClient.get()
                    .uri(usuariosUrl + "/clientes/" + evento.getIdCliente())
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();
                evento.setDatosCliente(cliente);
            } catch (Exception e) {
                evento.setDatosCliente("No disponible");
            }
            try {
                Object mascota = webClient.get()
                    .uri(usuariosUrl + "/mascotas/" + evento.getIdMascotaBday())
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();
                evento.setDatosMascotaBday(mascota);
            } catch (Exception e) {
                evento.setDatosMascotaBday("No disponible");
            }
        });
        return opt;
    }

    public List<Evento> buscarPorCliente(Long idCliente) {
        return eventoRepository.findByIdCliente(idCliente);
    }

    public Evento actualizarEvento(Long id, Evento datos) {
        return eventoRepository.findById(id).map(e -> {
            e.setFechaEvento(datos.getFechaEvento());
            e.setHoraInicio(datos.getHoraInicio());
            e.setHoraFin(datos.getHoraFin());
            e.setNumHumanos(datos.getNumHumanos());
            e.setIdEstado(datos.getIdEstado());
            e.setIdTematica(datos.getIdTematica());
            e.setIdLugar(datos.getIdLugar());
            e.setObservaciones(datos.getObservaciones());
            return eventoRepository.save(e);
        }).orElseThrow(() -> new RuntimeException("Evento no encontrado: " + id));
    }

    public void eliminarEvento(Long id) {
        eventoRepository.findById(id).ifPresent(e -> {
            e.setDeletedAt(java.time.LocalDateTime.now());
            eventoRepository.save(e);
        });
    }
}