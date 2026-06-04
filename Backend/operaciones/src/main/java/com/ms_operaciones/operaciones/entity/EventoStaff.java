package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evento_staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento_staff")
    private Integer idEventoStaff;

    @Column(name = "id_evento", nullable = false)
    private Integer idEvento;

    @Column(name = "id_empleado", nullable = false)
    private Integer idEmpleado;

    @Column(name = "id_rol_staff", nullable = false)
    private Integer idRolStaff;

    @Column(name = "asignado_en", nullable = false)
    private LocalDateTime asignadoEn;

    @PrePersist
    public void prePersist() {
        if (asignadoEn == null) {
            asignadoEn = LocalDateTime.now();
        }
    }
}
