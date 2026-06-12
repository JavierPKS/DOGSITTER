package com.example.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MascotaResponseDTO {
    private Integer idMascota;
    private Integer idCliente;
    private Integer idEspecie;
    private Integer idTamano;
    private String nombre;
    private String raza;
    private LocalDate fechaNac;
    private BigDecimal pesoKg;
}