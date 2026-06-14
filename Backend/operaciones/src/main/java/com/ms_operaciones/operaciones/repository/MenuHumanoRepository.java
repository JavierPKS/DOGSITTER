package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MenuHumano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuHumanoRepository extends JpaRepository<MenuHumano, Integer> {
    Optional<MenuHumano> findByMenuEvento_IdEvento(Integer idEvento);
}
