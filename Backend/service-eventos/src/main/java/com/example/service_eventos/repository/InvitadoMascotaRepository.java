package com.example.service_eventos.repository;

import com.example.service_eventos.model.InvitadoMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvitadoMascotaRepository extends JpaRepository<InvitadoMascota, Long> {

    List<InvitadoMascota> findByEvento_IdEvento(Long idEvento);
}