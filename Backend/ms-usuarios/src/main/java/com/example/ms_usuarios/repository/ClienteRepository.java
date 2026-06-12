package com.example.ms_usuarios.repository;

import com.example.ms_usuarios.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}