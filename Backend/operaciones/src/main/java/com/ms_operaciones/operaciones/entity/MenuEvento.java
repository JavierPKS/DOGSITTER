package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_evento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Integer idMenu;

    @Column(name = "id_evento", nullable = false, unique = true)
    private Integer idEvento;

    @Column(name = "generado_en", nullable = false)
    private LocalDateTime generadoEn;

    @Column(name = "aprobado", nullable = false)
    private Boolean aprobado;

    @PrePersist
    public void prePersist() {
        if (generadoEn == null) {
            generadoEn = LocalDateTime.now();
        }
        if (aprobado == null) {
            aprobado = false;
        }
    }
}
