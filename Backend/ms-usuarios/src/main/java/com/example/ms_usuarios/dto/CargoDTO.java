package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CargoDTO {
    private Integer idCargo;
    private String nombre;
    private String descripcion;
}