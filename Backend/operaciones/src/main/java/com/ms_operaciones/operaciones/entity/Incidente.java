package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "incidente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incidente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidente")
    private Integer idIncidente;

    @Column(name = "id_evento", nullable = false)
    private Integer idEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento_staff", nullable = false)
    private EventoStaff eventoStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_inc", nullable = false)
    private TipoIncidente tipoIncidente;

    @Column(name = "id_mascota")
    private Integer idMascota;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "registrado_en", nullable = false)
    private LocalDateTime registradoEn;

    @Column(name = "resuelto", nullable = false)
    private Boolean resuelto;

    @PrePersist
    public void prePersist() {
        if (registradoEn == null) {
            registradoEn = LocalDateTime.now();
        }
        if (resuelto == null) {
            resuelto = false;
        }
    }
}
