package com.catalogo.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.catalogo.catalogo.model.Lugar;

public interface LugarRepository extends JpaRepository<Lugar, Long> {
}