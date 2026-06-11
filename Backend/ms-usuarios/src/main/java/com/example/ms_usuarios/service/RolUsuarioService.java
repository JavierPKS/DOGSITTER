package com.example.ms_usuarios.service;

import com.example.ms_usuarios.dto.RolUsuarioDTO;
import com.example.ms_usuarios.model.RolUsuario;
import com.example.ms_usuarios.repository.RolUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RolUsuarioService {

    private final RolUsuarioRepository rolUsuarioRepository;

    public List<RolUsuarioDTO> findAll() {
        return rolUsuarioRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public RolUsuario findEntityByNombre(String nombreRol) {
        return rolUsuarioRepository.findAll().stream()
                .filter(r -> r.getNombreRol().equalsIgnoreCase(nombreRol))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + nombreRol));
    }

    private RolUsuarioDTO toDTO(RolUsuario rol) {
        return new RolUsuarioDTO(rol.getIdRol(), rol.getNombreRol(), rol.getDescripcion());
    }
}
