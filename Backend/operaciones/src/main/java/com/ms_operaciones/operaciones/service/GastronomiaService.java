package com.ms_operaciones.operaciones.service;

import com.ms_operaciones.operaciones.dto.MenuCaninoRequestDTO;
import com.ms_operaciones.operaciones.dto.MenuHumanoRequestDTO;
import com.ms_operaciones.operaciones.entity.MenuCanino;
import com.ms_operaciones.operaciones.entity.MenuEvento;
import com.ms_operaciones.operaciones.entity.MenuHumano;
import com.ms_operaciones.operaciones.entity.Bebestible;
import com.ms_operaciones.operaciones.entity.InsumoTorta;
import com.ms_operaciones.operaciones.repository.BebestibleRepository;
import com.ms_operaciones.operaciones.repository.InsumoTortaRepository;
import com.ms_operaciones.operaciones.repository.MenuCaninoRepository;
import com.ms_operaciones.operaciones.repository.MenuEventoRepository;
import com.ms_operaciones.operaciones.repository.MenuHumanoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GastronomiaService {

        private final MenuEventoRepository menuEventoRepository;
        private final MenuCaninoRepository menuCaninoRepository;
        private final MenuHumanoRepository menuHumanoRepository;
        private final BebestibleRepository bebestibleRepository;
        private final InsumoTortaRepository insumoTortaRepository;

        @Transactional
        public MenuCanino calcularYGuardarMenuCanino(MenuCaninoRequestDTO request) {
                MenuEvento menuEvento = obtenerOCrearMenuEvento(request.getIdEvento());

                int totalAlbondigas = (request.getPerrosPequenos() * 2) +
                                (request.getPerrosMedianos() * 3) +
                                (request.getPerrosGrandes() * 4);

                // (total_albondigas / 10) * 0.25 kg
                BigDecimal proteina = BigDecimal.valueOf(totalAlbondigas)
                                .divide(BigDecimal.valueOf(10), 3, RoundingMode.HALF_UP)
                                .multiply(BigDecimal.valueOf(0.25));

                MenuCanino menuCanino = MenuCanino.builder()
                                .menuEvento(menuEvento)
                                .perrosPequenos(request.getPerrosPequenos())
                                .perrosMedianos(request.getPerrosMedianos())
                                .perrosGrandes(request.getPerrosGrandes())
                                .totalAlbondigas(totalAlbondigas)
                                .gramajeProteinaKg(proteina)
                                .idTipoTorta(request.getIdTipoTorta())
                                .build();

                MenuCanino savedMenu = menuCaninoRepository.save(menuCanino);

                // Generar detalle de Insumos de Torta
                if (request.getIdTipoTorta() != null) {
                        generarInsumosTorta(savedMenu, request.getIdTipoTorta(), totalAlbondigas);
                }

                return savedMenu;
        }

        @Transactional
        public MenuHumano calcularYGuardarMenuHumano(MenuHumanoRequestDTO request) {
                MenuEvento menuEvento = obtenerOCrearMenuEvento(request.getIdEvento());

                int humanos = request.getTotalHumanos();
                int unidFingerFood = humanos * 3;

                // unid_finger_food * 0.04 kg
                BigDecimal kgCarne = BigDecimal.valueOf(unidFingerFood)
                                .multiply(BigDecimal.valueOf(0.04))
                                .setScale(3, RoundingMode.HALF_UP);

                int tablasPicoteo = humanos / 10;

                // humanos * 1.0 L
                BigDecimal litrosSinAlc = BigDecimal.valueOf(humanos)
                                .setScale(2, RoundingMode.HALF_UP);

                int unidConAlc = humanos * 3;

                MenuHumano menuHumano = MenuHumano.builder()
                                .menuEvento(menuEvento)
                                .totalHumanos(humanos)
                                .unidFingerFood(unidFingerFood)
                                .kgCarneSliders(kgCarne)
                                .tablasPicoteo(tablasPicoteo)
                                .litrosSinAlc(litrosSinAlc)
                                .unidConAlc(unidConAlc)
                                .build();

                MenuHumano savedMenu = menuHumanoRepository.save(menuHumano);

                // Generar detalle de Bebestibles
                generarBebestibles(savedMenu, litrosSinAlc, unidConAlc);

                return savedMenu;
        }

        private MenuEvento obtenerOCrearMenuEvento(Integer idEvento) {
                return menuEventoRepository.findByIdEvento(idEvento)
                                .orElseGet(() -> menuEventoRepository.save(
                                                MenuEvento.builder()
                                                                .idEvento(idEvento)
                                                                .generadoEn(LocalDateTime.now())
                                                                .aprobado(false)
                                                                .build()));
        }

        private void generarInsumosTorta(MenuCanino menuCanino, Integer idTipoTorta, int totalAlbondigas) {
                // Cantidades base por cada 10 albóndigas
                BigDecimal factor = BigDecimal.valueOf(totalAlbondigas)
                                .divide(BigDecimal.valueOf(10), 3, RoundingMode.HALF_UP);

                // Tipo 1: Vegana (Avena, Plátano)
                if (idTipoTorta == 1) {
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Harina de Avena")
                                        .cantidadKg(factor.multiply(BigDecimal.valueOf(0.150)))
                                        .unidades(0)
                                        .build());
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Plátano")
                                        .cantidadKg(BigDecimal.ZERO)
                                        .unidades(Math.max(1, factor.multiply(BigDecimal.valueOf(2)).intValue()))
                                        .build());
                }
                // Tipo 2: Proteica (Carne/Pollo, Zanahoria)
                else if (idTipoTorta == 2) {
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Carne Magra")
                                        .cantidadKg(factor.multiply(BigDecimal.valueOf(0.250)))
                                        .unidades(0)
                                        .build());
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Zanahoria Rallada")
                                        .cantidadKg(factor.multiply(BigDecimal.valueOf(0.100)))
                                        .unidades(0)
                                        .build());
                }
                // Tipo 3: Fría (Yogur sin lactosa, Frutas)
                else if (idTipoTorta == 3) {
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Yogur Natural S/L")
                                        .cantidadKg(factor.multiply(BigDecimal.valueOf(0.200)))
                                        .unidades(0)
                                        .build());
                        insumoTortaRepository.save(InsumoTorta.builder()
                                        .menuCanino(menuCanino)
                                        .idTipoTorta(idTipoTorta)
                                        .nombreInsumo("Fruta Variada")
                                        .cantidadKg(factor.multiply(BigDecimal.valueOf(0.150)))
                                        .unidades(0)
                                        .build());
                }
        }

        private void generarBebestibles(MenuHumano menuHumano, BigDecimal litrosSinAlc, int unidConAlc) {
                // Tipo 1: Sin Alcohol
                if (litrosSinAlc.compareTo(BigDecimal.ZERO) > 0) {
                        bebestibleRepository.save(Bebestible.builder()
                                        .menuHumano(menuHumano)
                                        .idTipoBeb(1)
                                        .cantidad(litrosSinAlc)
                                        .build());
                }

                // Tipo 2: Con Alcohol
                if (unidConAlc > 0) {
                        bebestibleRepository.save(Bebestible.builder()
                                        .menuHumano(menuHumano)
                                        .idTipoBeb(2)
                                        .cantidad(BigDecimal.valueOf(unidConAlc))
                                        .build());
                }
        }
}
