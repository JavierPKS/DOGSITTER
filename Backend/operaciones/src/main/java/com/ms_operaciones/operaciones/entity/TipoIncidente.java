package com.ms_operaciones.operaciones.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_incidente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoIncidente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_inc")
    private Integer idTipoInc;

    @Column(name = "nombre", nullable = false, length = 80, unique = true)
    private String nombre;

    @Column(name = "genera_alerta", nullable = false)
    private Boolean generaAlerta;

    @PrePersist
    public void prePersist() {
        if (generaAlerta == null) {
            generaAlerta = false;
        }
    }
}
