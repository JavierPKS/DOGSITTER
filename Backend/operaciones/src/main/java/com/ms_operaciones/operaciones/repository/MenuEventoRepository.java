package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MenuEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuEventoRepository extends JpaRepository<MenuEvento, Integer> {
    Optional<MenuEvento> findByIdEvento(Integer idEvento);
}
