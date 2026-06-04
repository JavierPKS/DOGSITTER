package com.example.service_eventos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "evento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long idEvento;

    @Column(name = "id_cliente", nullable = false)
    private Long idCliente;

    @Column(name = "id_mascota_bday", nullable = false)
    private Long idMascotaBday;

    @Column(name = "id_especie", nullable = false)
    private Long idEspecie;

    @Column(name = "id_tematica")
    private Long idTematica;

    @Column(name = "id_lugar")
    private Long idLugar;

    @Column(name = "id_estado", nullable = false)
    private Long idEstado;

    @Column(name = "fecha_evento", nullable = false)
    private LocalDate fechaEvento;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin")
    private LocalTime horaFin;

    @Column(name = "num_humanos", nullable = false)
    private Integer numHumanos;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Transient
    private Object datosCliente;

    @Transient
    private Object datosMascotaBday;

    @Transient
    private Object datosLugar;

    @PrePersist
    public void prePersist() {
        this.creadoEn = LocalDateTime.now();
        this.actualizadoEn = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.actualizadoEn = LocalDateTime.now();
    }
}