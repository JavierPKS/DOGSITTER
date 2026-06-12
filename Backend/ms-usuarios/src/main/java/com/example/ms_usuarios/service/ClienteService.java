package com.example.ms_usuarios.service;

import com.example.ms_usuarios.dto.ClienteRequestDTO;
import com.example.ms_usuarios.dto.ClienteResponseDTO;
import com.example.ms_usuarios.model.Cliente;
import com.example.ms_usuarios.model.Usuario;
import com.example.ms_usuarios.repository.ClienteRepository;
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
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final RolUsuarioService rolUsuarioService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ClienteResponseDTO crear(ClienteRequestDTO dto) {
        // 1. Crear el usuario base
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        usuario.setRol(rolUsuarioService.findEntityByNombre("CLIENTE"));
        usuario.setActivo(true);
        usuario.setCreatedAt(LocalDateTime.now());
        usuario.setUpdatedAt(LocalDateTime.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // 2. Crear el cliente asociado a ese usuario
        Cliente cliente = new Cliente();
        cliente.setUsuario(usuarioGuardado);
        cliente.setNombre(dto.getNombre());
        cliente.setApellido(dto.getApellido());
        cliente.setTelefono(dto.getTelefono());
        cliente.setRut(dto.getRut());
        cliente.setCreatedAt(LocalDateTime.now());
        cliente.setUpdatedAt(LocalDateTime.now());

        Cliente clienteGuardado = clienteRepository.save(cliente);

        return toDTO(clienteGuardado);
    }

    public List<ClienteResponseDTO> findAll() {
        return clienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClienteResponseDTO findById(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado: " + id));
        return toDTO(cliente);
    }

    private ClienteResponseDTO toDTO(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getIdCliente(),
                cliente.getUsuario().getIdUsuario(),
                cliente.getUsuario().getEmail(),
                cliente.getNombre(),
                cliente.getApellido(),
                cliente.getTelefono(),
                cliente.getRut()
        );
    }
}