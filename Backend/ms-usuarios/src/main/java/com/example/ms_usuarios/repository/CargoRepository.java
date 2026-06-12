package com.example.ms_usuarios.repository;

import com.example.ms_usuarios.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Integer> {
}