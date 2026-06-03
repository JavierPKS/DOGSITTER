package com.catalogo.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.catalogo.catalogo.model.Tematica;

public interface TematicaRepository extends JpaRepository<Tematica, Long> {
}