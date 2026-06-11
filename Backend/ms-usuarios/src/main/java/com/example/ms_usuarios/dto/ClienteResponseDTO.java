package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponseDTO {
    private Integer idCliente;
    private Integer idUsuario;
    private String email;
    private String nombre;
    private String apellido;
    private String telefono;
    private String rut;
}