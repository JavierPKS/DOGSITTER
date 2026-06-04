package com.example.service_eventos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitud_servicio",
       uniqueConstraints = @UniqueConstraint(columnNames = {"id_evento", "id_tipo_servicio"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud_serv")
    private Long idSolicitudServ;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @Column(name = "id_tipo_servicio", nullable = false)
    private Long idTipoServicio;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad = 1;

    @Column(name = "notas")
    private String notas;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}