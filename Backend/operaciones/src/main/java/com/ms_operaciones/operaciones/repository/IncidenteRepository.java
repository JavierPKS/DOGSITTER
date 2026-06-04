package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.Incidente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidenteRepository extends JpaRepository<Incidente, Integer> {
    List<Incidente> findByIdEvento(Integer idEvento);
}
