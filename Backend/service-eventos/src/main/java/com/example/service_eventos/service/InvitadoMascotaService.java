package com.example.service_eventos.service;

import com.example.service_eventos.model.InvitadoMascota;
import com.example.service_eventos.repository.InvitadoMascotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvitadoMascotaService {

    private final InvitadoMascotaRepository repo;

    public InvitadoMascota agregarInvitado(InvitadoMascota invitado) {
        return repo.save(invitado);
    }

    public List<InvitadoMascota> listarPorEvento(Long idEvento) {
        return repo.findByEvento_IdEvento(idEvento);
    }

    public InvitadoMascota confirmarAsistencia(Long idInvitado) {
        return repo.findById(idInvitado).map(i -> {
            i.setConfirmado(true);
            return repo.save(i);
        }).orElseThrow(() -> new RuntimeException("Invitado no encontrado: " + idInvitado));
    }

    public void eliminarInvitado(Long id) {
        repo.deleteById(id);
    }
}