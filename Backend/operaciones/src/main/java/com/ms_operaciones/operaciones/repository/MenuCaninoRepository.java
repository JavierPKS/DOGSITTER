package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MenuCanino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuCaninoRepository extends JpaRepository<MenuCanino, Integer> {
    Optional<MenuCanino> findByMenuEvento_IdEvento(Integer idEvento);
}
