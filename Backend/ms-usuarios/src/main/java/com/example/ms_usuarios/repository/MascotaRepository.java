package com.example.ms_usuarios.repository;

import com.example.ms_usuarios.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Integer> {
    List<Mascota> findByClienteIdCliente(Integer idCliente);
}
