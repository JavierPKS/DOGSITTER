package com.example.ms_usuarios.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MascotaRequestDTO {

    @NotNull
    private Integer idCliente;

    @NotNull
    private Integer idEspecie;

    @NotNull
    private Integer idTamano;

    @NotBlank
    private String nombre;

    private String raza;
    private LocalDate fechaNac;
    private BigDecimal pesoKg;
}