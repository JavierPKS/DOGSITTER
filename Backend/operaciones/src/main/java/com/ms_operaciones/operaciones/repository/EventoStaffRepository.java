package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.EventoStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventoStaffRepository extends JpaRepository<EventoStaff, Integer> {
    Optional<EventoStaff> findByIdEventoAndIdEmpleado(Integer idEvento, Integer idEmpleado);
}
