package com.catalogo.catalogo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "especie")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Especie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}
