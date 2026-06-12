package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolUsuarioDTO {
    private Integer idRol;
    private String nombreRol;
    private String descripcion;
}