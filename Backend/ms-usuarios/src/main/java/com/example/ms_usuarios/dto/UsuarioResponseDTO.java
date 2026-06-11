package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponseDTO {
    private Integer idUsuario;
    private String email;
    private String nombreRol;
    private Boolean activo;
}
