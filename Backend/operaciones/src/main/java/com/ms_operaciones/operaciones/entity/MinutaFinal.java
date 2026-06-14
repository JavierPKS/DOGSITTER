package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "minuta_final")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MinutaFinal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_minuta")
    private Integer idMinuta;

    @Column(name = "id_evento", nullable = false, unique = true)
    private Integer idEvento;

    @Column(name = "generado_en", nullable = false)
    private LocalDateTime generadoEn;

    @Column(name = "url_pdf", columnDefinition = "TEXT")
    private String urlPdf;

    @Column(name = "resumen_menu", columnDefinition = "TEXT")
    private String resumenMenu;

    @Column(name = "resumen_staff", columnDefinition = "TEXT")
    private String resumenStaff;

    @Column(name = "resumen_incidentes", columnDefinition = "TEXT")
    private String resumenIncidentes;

    @Column(name = "enviado_cliente", nullable = false)
    private Boolean enviadoCliente;

    @PrePersist
    public void prePersist() {
        if (generadoEn == null) {
            generadoEn = LocalDateTime.now();
        }
        if (enviadoCliente == null) {
            enviadoCliente = false;
        }
    }
}
