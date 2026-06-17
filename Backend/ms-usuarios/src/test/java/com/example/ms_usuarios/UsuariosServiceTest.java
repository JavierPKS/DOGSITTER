package com.example.ms_usuarios;

import com.example.ms_usuarios.dto.ClienteRequestDTO;
import com.example.ms_usuarios.dto.ClienteResponseDTO;
import com.example.ms_usuarios.model.Cliente;
import com.example.ms_usuarios.model.RolUsuario;
import com.example.ms_usuarios.model.Usuario;
import com.example.ms_usuarios.repository.ClienteRepository;
import com.example.ms_usuarios.repository.UsuarioRepository;
import com.example.ms_usuarios.service.ClienteService;
import com.example.ms_usuarios.service.RolUsuarioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsuariosServiceTest {
    @Mock
    private ClienteRepository clienteRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private RolUsuarioService rolUsuarioService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private ClienteService clienteService;

    @Test
    void testCrearCliente() {
        ClienteRequestDTO request = new ClienteRequestDTO();
        request.setEmail("test@test.com");
        request.setPassword("password");
        request.setNombre("Test");
        request.setApellido("User");
        request.setTelefono("123456789");
        request.setRut("11111111-1");
        RolUsuario rol = new RolUsuario();
        rol.setNombreRol("CLIENTE");
        Usuario usuarioGuardado = new Usuario();
        usuarioGuardado.setIdUsuario(1);
        usuarioGuardado.setEmail("test@test.com");
        Cliente clienteGuardado = new Cliente();
        clienteGuardado.setIdCliente(1);
        clienteGuardado.setUsuario(usuarioGuardado);
        clienteGuardado.setNombre("Test");
        clienteGuardado.setApellido("User");
        clienteGuardado.setTelefono("123456789");
        clienteGuardado.setRut("11111111-1");
        when(rolUsuarioService.findEntityByNombre("CLIENTE")).thenReturn(rol);
        when(passwordEncoder.encode("password")).thenReturn("hashed_password");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioGuardado);
        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteGuardado);
        ClienteResponseDTO result = clienteService.crear(request);
        assertNotNull(result);
        assertEquals(1, result.getIdUsuario());
        assertEquals("test@test.com", result.getEmail());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
        verify(clienteRepository, times(1)).save(any(Cliente.class));
    }

    @Test
    void testFindAll() {
        Cliente c1 = new Cliente();
        Usuario u1 = new Usuario();
        u1.setIdUsuario(1);
        c1.setUsuario(u1);
        Cliente c2 = new Cliente();
        Usuario u2 = new Usuario();
        u2.setIdUsuario(2);
        c2.setUsuario(u2);
        when(clienteRepository.findAll()).thenReturn(Arrays.asList(c1, c2));
        List<ClienteResponseDTO> result = clienteService.findAll();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        Cliente c = new Cliente();
        Usuario u = new Usuario();
        u.setIdUsuario(1);
        c.setUsuario(u);
        c.setIdCliente(1);
        when(clienteRepository.findById(1)).thenReturn(Optional.of(c));
        ClienteResponseDTO result = clienteService.findById(1);
        assertNotNull(result);
        assertEquals(1, result.getIdCliente());
        verify(clienteRepository, times(1)).findById(1);
    }
}