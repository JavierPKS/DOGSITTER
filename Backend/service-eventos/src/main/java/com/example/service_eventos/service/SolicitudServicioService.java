package com.example.service_eventos.service;

import com.example.service_eventos.model.SolicitudServicio;
import com.example.service_eventos.repository.SolicitudServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitudServicioService {

    private final SolicitudServicioRepository repo;

    public SolicitudServicio agregarSolicitud(SolicitudServicio solicitud) {
        return repo.save(solicitud);
    }

    public List<SolicitudServicio> listarPorEvento(Long idEvento) {
        return repo.findByEvento_IdEvento(idEvento);
    }

    public void eliminarSolicitud(Long id) {
        repo.deleteById(id);
    }
}