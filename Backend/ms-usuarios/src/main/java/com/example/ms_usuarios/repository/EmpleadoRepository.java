package com.example.ms_usuarios.repository;

import com.example.ms_usuarios.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
}