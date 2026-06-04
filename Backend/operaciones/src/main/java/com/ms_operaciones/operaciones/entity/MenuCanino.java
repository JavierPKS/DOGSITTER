package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "menu_canino")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuCanino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu_canino")
    private Integer idMenuCanino;

    @OneToOne
    @JoinColumn(name = "id_menu", nullable = false, unique = true)
    private MenuEvento menuEvento;

    @Column(name = "perros_pequenos", nullable = false)
    private Integer perrosPequenos;

    @Column(name = "perros_medianos", nullable = false)
    private Integer perrosMedianos;

    @Column(name = "perros_grandes", nullable = false)
    private Integer perrosGrandes;

    @Column(name = "total_albondigas", nullable = false)
    private Integer totalAlbondigas;

    @Column(name = "gramaje_proteina_kg", nullable = false, precision = 6, scale = 3)
    private BigDecimal gramajeProteinaKg;

    @Column(name = "id_tipo_torta")
    private Integer idTipoTorta;

    @PrePersist
    public void prePersist() {
        if (perrosPequenos == null) perrosPequenos = 0;
        if (perrosMedianos == null) perrosMedianos = 0;
        if (perrosGrandes == null) perrosGrandes = 0;
        if (totalAlbondigas == null) totalAlbondigas = 0;
        if (gramajeProteinaKg == null) gramajeProteinaKg = BigDecimal.ZERO;
    }
}
