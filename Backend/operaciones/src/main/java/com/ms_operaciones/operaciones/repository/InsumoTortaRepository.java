package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.InsumoTorta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsumoTortaRepository extends JpaRepository<InsumoTorta, Integer> {
}
