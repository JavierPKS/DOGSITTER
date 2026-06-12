package com.example.ms_usuarios.service;

import com.example.ms_usuarios.dto.MascotaRequestDTO;
import com.example.ms_usuarios.dto.MascotaResponseDTO;
import com.example.ms_usuarios.model.Cliente;
import com.example.ms_usuarios.model.Mascota;
import com.example.ms_usuarios.repository.ClienteRepository;
import com.example.ms_usuarios.repository.MascotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final ClienteRepository clienteRepository;

    public MascotaResponseDTO crear(MascotaRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado: " + dto.getIdCliente()));

        Mascota mascota = new Mascota();
        mascota.setCliente(cliente);
        mascota.setIdEspecie(dto.getIdEspecie());
        mascota.setIdTamano(dto.getIdTamano());
        mascota.setNombre(dto.getNombre());
        mascota.setRaza(dto.getRaza());
        mascota.setFechaNac(dto.getFechaNac());
        mascota.setPesoKg(dto.getPesoKg());
        mascota.setCreatedAt(LocalDateTime.now());
        mascota.setUpdatedAt(LocalDateTime.now());

        return toDTO(mascotaRepository.save(mascota));
    }

    public List<MascotaResponseDTO> findAll() {
        return mascotaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public MascotaResponseDTO findById(Integer id) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada: " + id));
        return toDTO(mascota);
    }

    public List<MascotaResponseDTO> findByCliente(Integer idCliente) {
        return mascotaRepository.findByClienteIdCliente(idCliente).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private MascotaResponseDTO toDTO(Mascota mascota) {
        return new MascotaResponseDTO(
                mascota.getIdMascota(),
                mascota.getCliente().getIdCliente(),
                mascota.getIdEspecie(),
                mascota.getIdTamano(),
                mascota.getNombre(),
                mascota.getRaza(),
                mascota.getFechaNac(),
                mascota.getPesoKg()
        );
    }
}