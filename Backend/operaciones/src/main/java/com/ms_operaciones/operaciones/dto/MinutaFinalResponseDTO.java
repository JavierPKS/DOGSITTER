package com.ms_operaciones.operaciones.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de respuesta enriquecida para la Minuta Final de un evento.
 * Consolida toda la información necesaria para que el frontend
 * construya la vista de impresión HTML con window.print().
 */
@Data
@Builder
public class MinutaFinalResponseDTO {

    // --- Metadata de la Minuta ---
    private Integer idMinuta;
    private Integer idEvento;
    private LocalDateTime generadoEn;
    private Boolean enviadoCliente;

    // --- Sección: Menú Canino ---
    private MenuCaninoDTO menuCanino;

    // --- Sección: Menú Humano ---
    private MenuHumanoDTO menuHumano;

    // --- Sección: Staff Asignado ---
    private List<EventoStaffDTO> staff;

    // --- Sección: Incidentes ---
    private List<IncidenteDTO> incidentes;

    // ─────────────────────────────────────────
    //  Clases internas (nested DTOs)
    // ─────────────────────────────────────────

    @Data
    @Builder
    public static class MenuCaninoDTO {
        private Integer perrosPequenos;
        private Integer perrosMedianos;
        private Integer perrosGrandes;
        private Integer totalAlbondigas;
        private BigDecimal gramajeProteinaKg;
        private Integer idTipoTorta;
        private String nombreTipoTorta;
    }

    @Data
    @Builder
    public static class MenuHumanoDTO {
        private Integer totalHumanos;
        private Integer unidFingerFood;
        private BigDecimal kgCarneSliders;
        private Integer tablasPicoteo;
        private BigDecimal litrosSinAlc;
        private Integer unidConAlc;
    }

    @Data
    @Builder
    public static class EventoStaffDTO {
        private Integer idEmpleado;
        private Integer idRolStaff;
        private String nombreRolStaff;
        private LocalDateTime asignadoEn;
    }

    @Data
    @Builder
    public static class IncidenteDTO {
        private Integer idIncidente;
        private String tipoIncidente;
        private String descripcion;
        private LocalDateTime registradoEn;
        private Boolean resuelto;
        private Integer idMascota;
    }
}
