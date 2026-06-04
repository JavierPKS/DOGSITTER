package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "marcaje_turno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarcajeTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marcaje")
    private Integer idMarcaje;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento_staff", nullable = false)
    private EventoStaff eventoStaff;

    @Column(name = "inicio_turno", nullable = false)
    private LocalDateTime inicioTurno;

    @Column(name = "fin_turno")
    private LocalDateTime finTurno;
}
