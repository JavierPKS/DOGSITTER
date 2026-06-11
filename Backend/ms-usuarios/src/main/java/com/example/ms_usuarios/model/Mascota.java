package com.example.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mascota")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mascota")
    private Integer idMascota;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @Column(name = "id_especie", nullable = false)
    private Integer idEspecie; // referencia externa a db_catalogo.especie

    @Column(name = "id_tamano", nullable = false)
    private Integer idTamano; // referencia externa a db_catalogo.tamano_mascota

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 100)
    private String raza;

    @Column(name = "fecha_nac")
    private LocalDate fechaNac;

    @Column(name = "peso_kg", precision = 5, scale = 2)
    private BigDecimal pesoKg;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}