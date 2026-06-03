package com.catalogo.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.catalogo.catalogo.model.TamanoMascota;

public interface TamanoMascotaRepository extends JpaRepository<TamanoMascota, Long> {
}