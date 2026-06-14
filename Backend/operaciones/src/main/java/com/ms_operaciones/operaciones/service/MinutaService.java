package com.ms_operaciones.operaciones.service;

import com.ms_operaciones.operaciones.dto.MinutaFinalResponseDTO;
import com.ms_operaciones.operaciones.entity.EventoStaff;
import com.ms_operaciones.operaciones.entity.Incidente;
import com.ms_operaciones.operaciones.entity.MenuCanino;
import com.ms_operaciones.operaciones.entity.MenuHumano;
import com.ms_operaciones.operaciones.entity.MinutaFinal;
import com.ms_operaciones.operaciones.repository.EventoStaffRepository;
import com.ms_operaciones.operaciones.repository.IncidenteRepository;
import com.ms_operaciones.operaciones.repository.MenuCaninoRepository;
import com.ms_operaciones.operaciones.repository.MenuHumanoRepository;
import com.ms_operaciones.operaciones.repository.MinutaFinalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MinutaService {

    private final MinutaFinalRepository minutaFinalRepository;
    private final MenuCaninoRepository menuCaninoRepository;
    private final MenuHumanoRepository menuHumanoRepository;
    private final EventoStaffRepository eventoStaffRepository;
    private final IncidenteRepository incidenteRepository;

    /**
     * Genera (o regenera) la minuta final de un evento consolidando
     * menú, staff asignado e incidentes en texto plano y persistiéndolos.
     *
     * @param idEvento ID del evento a resumir
     * @return MinutaFinalResponseDTO con todos los datos para la vista de impresión
     */
    @Transactional
    public MinutaFinalResponseDTO generarMinuta(Integer idEvento) {

        // ── 1. Recuperar datos de menú ────────────────────────────────────
        MenuCanino menuCanino = menuCaninoRepository
                .findByMenuEvento_IdEvento(idEvento)
                .orElse(null);

        MenuHumano menuHumano = menuHumanoRepository
                .findByMenuEvento_IdEvento(idEvento)
                .orElse(null);

        // ── 2. Recuperar staff asignado ───────────────────────────────────
        List<EventoStaff> staffList = eventoStaffRepository.findByIdEvento(idEvento);

        // ── 3. Recuperar incidentes ───────────────────────────────────────
        List<Incidente> incidentes = incidenteRepository.findByIdEvento(idEvento);

        // ── 4. Construir textos de resumen para persistencia ──────────────
        String resumenMenu   = construirResumenMenu(menuCanino, menuHumano);
        String resumenStaff  = construirResumenStaff(staffList);
        String resumenInc    = construirResumenIncidentes(incidentes);

        // ── 5. Persistir o actualizar la minuta ───────────────────────────
        MinutaFinal minuta = minutaFinalRepository
                .findByIdEvento(idEvento)
                .orElse(MinutaFinal.builder()
                        .idEvento(idEvento)
                        .build());

        minuta.setResumenMenu(resumenMenu);
        minuta.setResumenStaff(resumenStaff);
        minuta.setResumenIncidentes(resumenInc);
        minuta.setGeneradoEn(LocalDateTime.now());
        // url_pdf: se establece desde el frontend (vista de impresión HTML)
        minuta.setUrlPdf("vista-impresion/evento/" + idEvento);

        MinutaFinal saved = minutaFinalRepository.save(minuta);

        // ── 6. Construir y devolver el DTO enriquecido ────────────────────
        return buildResponseDTO(saved, menuCanino, menuHumano, staffList, incidentes);
    }

    /**
     * Consulta la minuta final ya existente de un evento.
     *
     * @param idEvento ID del evento
     * @return MinutaFinalResponseDTO con todos los datos consolidados
     */
    @Transactional(readOnly = true)
    public MinutaFinalResponseDTO obtenerMinuta(Integer idEvento) {
        MinutaFinal minuta = minutaFinalRepository.findByIdEvento(idEvento)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No existe minuta generada para el evento: " + idEvento));

        MenuCanino menuCanino     = menuCaninoRepository.findByMenuEvento_IdEvento(idEvento).orElse(null);
        MenuHumano menuHumano     = menuHumanoRepository.findByMenuEvento_IdEvento(idEvento).orElse(null);
        List<EventoStaff> staff   = eventoStaffRepository.findByIdEvento(idEvento);
        List<Incidente> incidentes = incidenteRepository.findByIdEvento(idEvento);

        return buildResponseDTO(minuta, menuCanino, menuHumano, staff, incidentes);
    }

    // ═══════════════════════════════════════════════════════════════
    //  Métodos privados de construcción
    // ═══════════════════════════════════════════════════════════════

    private MinutaFinalResponseDTO buildResponseDTO(
            MinutaFinal minuta,
            MenuCanino menuCanino,
            MenuHumano menuHumano,
            List<EventoStaff> staffList,
            List<Incidente> incidentes) {

        return MinutaFinalResponseDTO.builder()
                .idMinuta(minuta.getIdMinuta())
                .idEvento(minuta.getIdEvento())
                .generadoEn(minuta.getGeneradoEn())
                .enviadoCliente(minuta.getEnviadoCliente())
                .menuCanino(menuCanino != null ? buildMenuCaninoDTO(menuCanino) : null)
                .menuHumano(menuHumano != null ? buildMenuHumanoDTO(menuHumano) : null)
                .staff(staffList.stream().map(this::buildStaffDTO).collect(Collectors.toList()))
                .incidentes(incidentes.stream().map(this::buildIncidenteDTO).collect(Collectors.toList()))
                .build();
    }

    private MinutaFinalResponseDTO.MenuCaninoDTO buildMenuCaninoDTO(MenuCanino mc) {
        // Nombre del tipo de torta (mapeado desde el catálogo estático)
        String nombreTorta = resolverNombreTipoTorta(mc.getIdTipoTorta());
        return MinutaFinalResponseDTO.MenuCaninoDTO.builder()
                .perrosPequenos(mc.getPerrosPequenos())
                .perrosMedianos(mc.getPerrosMedianos())
                .perrosGrandes(mc.getPerrosGrandes())
                .totalAlbondigas(mc.getTotalAlbondigas())
                .gramajeProteinaKg(mc.getGramajeProteinaKg())
                .idTipoTorta(mc.getIdTipoTorta())
                .nombreTipoTorta(nombreTorta)
                .build();
    }

    private MinutaFinalResponseDTO.MenuHumanoDTO buildMenuHumanoDTO(MenuHumano mh) {
        return MinutaFinalResponseDTO.MenuHumanoDTO.builder()
                .totalHumanos(mh.getTotalHumanos())
                .unidFingerFood(mh.getUnidFingerFood())
                .kgCarneSliders(mh.getKgCarneSliders())
                .tablasPicoteo(mh.getTablasPicoteo())
                .litrosSinAlc(mh.getLitrosSinAlc())
                .unidConAlc(mh.getUnidConAlc())
                .build();
    }

    private MinutaFinalResponseDTO.EventoStaffDTO buildStaffDTO(EventoStaff es) {
        return MinutaFinalResponseDTO.EventoStaffDTO.builder()
                .idEmpleado(es.getIdEmpleado())
                .idRolStaff(es.getIdRolStaff())
                .nombreRolStaff(resolverNombreRolStaff(es.getIdRolStaff()))
                .asignadoEn(es.getAsignadoEn())
                .build();
    }

    private MinutaFinalResponseDTO.IncidenteDTO buildIncidenteDTO(Incidente i) {
        String tipoNombre = (i.getTipoIncidente() != null)
                ? i.getTipoIncidente().getNombre()
                : "Desconocido";
        return MinutaFinalResponseDTO.IncidenteDTO.builder()
                .idIncidente(i.getIdIncidente())
                .tipoIncidente(tipoNombre)
                .descripcion(i.getDescripcion())
                .registradoEn(i.getRegistradoEn())
                .resuelto(i.getResuelto())
                .idMascota(i.getIdMascota())
                .build();
    }

    // ── Helpers de texto plano para columnas de resumen ───────────────────

    private String construirResumenMenu(MenuCanino mc, MenuHumano mh) {
        StringBuilder sb = new StringBuilder();
        if (mc != null) {
            sb.append("=== MENÚ CANINO ===\n");
            sb.append("Perros pequeños: ").append(mc.getPerrosPequenos()).append("\n");
            sb.append("Perros medianos: ").append(mc.getPerrosMedianos()).append("\n");
            sb.append("Perros grandes:  ").append(mc.getPerrosGrandes()).append("\n");
            sb.append("Total albóndigas: ").append(mc.getTotalAlbondigas()).append("\n");
            sb.append("Gramaje proteína: ").append(mc.getGramajeProteinaKg()).append(" kg\n");
            sb.append("Tipo torta: ").append(resolverNombreTipoTorta(mc.getIdTipoTorta())).append("\n\n");
        }
        if (mh != null) {
            sb.append("=== MENÚ HUMANO ===\n");
            sb.append("Total humanos: ").append(mh.getTotalHumanos()).append("\n");
            sb.append("Finger food: ").append(mh.getUnidFingerFood()).append(" unidades\n");
            sb.append("Carne sliders: ").append(mh.getKgCarneSliders()).append(" kg\n");
            sb.append("Tablas picoteo: ").append(mh.getTablasPicoteo()).append("\n");
            sb.append("Sin alcohol: ").append(mh.getLitrosSinAlc()).append(" L\n");
            sb.append("Con alcohol: ").append(mh.getUnidConAlc()).append(" unidades\n");
        }
        return sb.toString().trim();
    }

    private String construirResumenStaff(List<EventoStaff> staffList) {
        if (staffList.isEmpty()) return "Sin staff asignado.";
        StringBuilder sb = new StringBuilder();
        staffList.forEach(es -> sb
                .append("Empleado #").append(es.getIdEmpleado())
                .append(" — Rol: ").append(resolverNombreRolStaff(es.getIdRolStaff()))
                .append("\n"));
        return sb.toString().trim();
    }

    private String construirResumenIncidentes(List<Incidente> incidentes) {
        if (incidentes.isEmpty()) return "Sin incidentes registrados.";
        StringBuilder sb = new StringBuilder();
        incidentes.forEach(i -> sb
                .append("[").append(i.getTipoIncidente() != null ? i.getTipoIncidente().getNombre() : "?").append("] ")
                .append(i.getDescripcion())
                .append(" — Resuelto: ").append(Boolean.TRUE.equals(i.getResuelto()) ? "Sí" : "No")
                .append("\n"));
        return sb.toString().trim();
    }

    // ── Mapeo estático de IDs de catálogo (evita llamadas HTTP para datos lookup) ──

    private String resolverNombreTipoTorta(Integer id) {
        if (id == null) return "Sin torta";
        return switch (id) {
            case 1 -> "Vegana";
            case 2 -> "Proteica";
            case 3 -> "Fría";
            default -> "Tipo " + id;
        };
    }

    private String resolverNombreRolStaff(Integer id) {
        if (id == null) return "Sin rol";
        return switch (id) {
            case 1 -> "Coordinador de Evento";
            case 2 -> "Monitor Canino";
            case 3 -> "Garzón";
            case 4 -> "Técnico Veterinario";
            case 5 -> "Animador";
            default -> "Rol " + id;
        };
    }
}
