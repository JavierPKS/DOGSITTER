package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "bebestible")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bebestible {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bebestible")
    private Integer idBebestible;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_menu_humano", nullable = false)
    private MenuHumano menuHumano;

    @Column(name = "id_tipo_beb", nullable = false)
    private Integer idTipoBeb;

    @Column(name = "cantidad", nullable = false, precision = 8, scale = 2)
    private BigDecimal cantidad;
}
