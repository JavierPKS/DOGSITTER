package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MinutaFinal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MinutaFinalRepository extends JpaRepository<MinutaFinal, Integer> {
    Optional<MinutaFinal> findByIdEvento(Integer idEvento);
    boolean existsByIdEvento(Integer idEvento);
}
