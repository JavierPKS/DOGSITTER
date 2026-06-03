package com.example.service_eventos.repository;

import com.example.service_eventos.model.SolicitudServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SolicitudServicioRepository extends JpaRepository<SolicitudServicio, Long> {

    List<SolicitudServicio> findByEvento_IdEvento(Long idEvento);
}