package com.catalogo.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.catalogo.catalogo.model.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Long> {
}