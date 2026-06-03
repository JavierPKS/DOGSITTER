package com.catalogo.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.catalogo.catalogo.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}