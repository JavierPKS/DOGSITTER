package com.catalogo.catalogo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tamano_mascota")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TamanoMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private int multiplicadorAlbondigas;
}