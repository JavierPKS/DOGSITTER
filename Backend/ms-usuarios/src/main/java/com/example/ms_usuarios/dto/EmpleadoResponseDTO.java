package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoResponseDTO {
    private Integer idEmpleado;
    private String email;
    private String nombre;
    private String apellido;
    private String telefono;
    private String cargo;
    private Boolean disponible;
}