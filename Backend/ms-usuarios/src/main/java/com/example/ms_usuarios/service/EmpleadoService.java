package com.example.ms_usuarios.service;

import com.example.ms_usuarios.dto.EmpleadoRequestDTO;
import com.example.ms_usuarios.dto.EmpleadoResponseDTO;
import com.example.ms_usuarios.model.Empleado;
import com.example.ms_usuarios.model.Usuario;
import com.example.ms_usuarios.repository.EmpleadoRepository;
import com.example.ms_usuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;
    private final UsuarioRepository usuarioRepository;
    private final RolUsuarioService rolUsuarioService;
    private final CargoService cargoService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public EmpleadoResponseDTO crear(EmpleadoRequestDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        usuario.setRol(rolUsuarioService.findEntityByNombre("STAFF"));
        usuario.setActivo(true);
        usuario.setCreatedAt(LocalDateTime.now());
        usuario.setUpdatedAt(LocalDateTime.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Empleado empleado = new Empleado();
        empleado.setUsuario(usuarioGuardado);
        empleado.setCargo(cargoService.findEntityByNombre(dto.getNombreCargo()));
        empleado.setNombre(dto.getNombre());
        empleado.setApellido(dto.getApellido());
        empleado.setTelefono(dto.getTelefono());
        empleado.setDisponible(true);
        empleado.setCreatedAt(LocalDateTime.now());
        empleado.setUpdatedAt(LocalDateTime.now());

        Empleado empleadoGuardado = empleadoRepository.save(empleado);

        return toDTO(empleadoGuardado);
    }

    public List<EmpleadoResponseDTO> findAll() {
        return empleadoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EmpleadoResponseDTO findById(Integer id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado: " + id));
        return toDTO(empleado);
    }

    public List<EmpleadoResponseDTO> findDisponibles() {
        return empleadoRepository.findAll().stream()
                .filter(Empleado::getDisponible)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private EmpleadoResponseDTO toDTO(Empleado empleado) {
        return new EmpleadoResponseDTO(
                empleado.getIdEmpleado(),
                empleado.getUsuario().getEmail(),
                empleado.getNombre(),
                empleado.getApellido(),
                empleado.getTelefono(),
                empleado.getCargo().getNombre(),
                empleado.getDisponible()
        );
    }
}