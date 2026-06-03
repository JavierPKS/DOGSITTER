package com.ms_operaciones.operaciones.service;

import com.ms_operaciones.operaciones.dto.MenuCaninoRequestDTO;
import com.ms_operaciones.operaciones.dto.MenuHumanoRequestDTO;
import com.ms_operaciones.operaciones.entity.MenuCanino;
import com.ms_operaciones.operaciones.entity.MenuEvento;
import com.ms_operaciones.operaciones.entity.MenuHumano;
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

        return menuCaninoRepository.save(menuCanino);
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

        return menuHumanoRepository.save(menuHumano);
    }

    private MenuEvento obtenerOCrearMenuEvento(Integer idEvento) {
        return menuEventoRepository.findByIdEvento(idEvento)
                .orElseGet(() -> menuEventoRepository.save(
                        MenuEvento.builder()
                                .idEvento(idEvento)
                                .generadoEn(LocalDateTime.now())
                                .aprobado(false)
                                .build()
                ));
    }
}
