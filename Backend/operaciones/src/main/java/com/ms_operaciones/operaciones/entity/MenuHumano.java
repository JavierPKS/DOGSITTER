package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "menu_humano")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuHumano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu_humano")
    private Integer idMenuHumano;

    @OneToOne
    @JoinColumn(name = "id_menu", nullable = false, unique = true)
    private MenuEvento menuEvento;

    @Column(name = "total_humanos", nullable = false)
    private Integer totalHumanos;

    @Column(name = "unid_finger_food", nullable = false)
    private Integer unidFingerFood;

    @Column(name = "kg_carne_sliders", nullable = false, precision = 8, scale = 3)
    private BigDecimal kgCarneSliders;

    @Column(name = "tablas_picoteo", nullable = false)
    private Integer tablasPicoteo;

    @Column(name = "litros_sin_alc", nullable = false, precision = 8, scale = 2)
    private BigDecimal litrosSinAlc;

    @Column(name = "unid_con_alc", nullable = false)
    private Integer unidConAlc;

    @PrePersist
    public void prePersist() {
        if (unidFingerFood == null) unidFingerFood = 0;
        if (kgCarneSliders == null) kgCarneSliders = BigDecimal.ZERO;
        if (tablasPicoteo == null) tablasPicoteo = 0;
        if (litrosSinAlc == null) litrosSinAlc = BigDecimal.ZERO;
        if (unidConAlc == null) unidConAlc = 0;
    }
}
