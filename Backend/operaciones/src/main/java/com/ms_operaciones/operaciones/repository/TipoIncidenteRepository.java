package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.TipoIncidente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipoIncidenteRepository extends JpaRepository<TipoIncidente, Integer> {
    Optional<TipoIncidente> findByNombre(String nombre);
}
