package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MarcajeTurno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcajeTurnoRepository extends JpaRepository<MarcajeTurno, Integer> {
}
