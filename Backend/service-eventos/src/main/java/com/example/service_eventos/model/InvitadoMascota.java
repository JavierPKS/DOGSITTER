package com.example.service_eventos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "invitado_mascota",
       uniqueConstraints = @UniqueConstraint(columnNames = {"id_evento", "id_mascota"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitadoMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invitado")
    private Long idInvitado;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @Column(name = "id_mascota", nullable = false)
    private Long idMascota;

    @Column(name = "id_adulto_resp", nullable = false)
    private Long idAdultoResp;

    @Column(name = "confirmado")
    private Boolean confirmado = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Transient
    private Object datosMascota;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}