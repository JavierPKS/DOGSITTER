package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "insumo_torta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsumoTorta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_insumo")
    private Integer idInsumo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_menu_canino", nullable = false)
    private MenuCanino menuCanino;

    @Column(name = "id_tipo_torta", nullable = false)
    private Integer idTipoTorta;

    @Column(name = "nombre_insumo", nullable = false, length = 100)
    private String nombreInsumo;

    @Column(name = "cantidad_kg", nullable = false, precision = 8, scale = 3)
    private BigDecimal cantidadKg;

    @Column(name = "unidades")
    private Integer unidades;
}
