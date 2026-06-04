package com.example.service_eventos.repository;

import com.example.service_eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByIdCliente(Long idCliente);
    List<Evento> findByFechaEvento(LocalDate fecha);
    List<Evento> findByIdEstado(Long idEstado);
    List<Evento> findByDeletedAtIsNull();
}