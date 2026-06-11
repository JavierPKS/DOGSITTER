package com.example.ms_usuarios.service;

import com.example.ms_usuarios.dto.CargoDTO;
import com.example.ms_usuarios.model.Cargo;
import com.example.ms_usuarios.repository.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CargoService {

    private final CargoRepository cargoRepository;

    public List<CargoDTO> findAll() {
        return cargoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Cargo findEntityByNombre(String nombre) {
        return cargoRepository.findAll().stream()
                .filter(c -> c.getNombre().equalsIgnoreCase(nombre))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cargo no encontrado: " + nombre));
    }

    private CargoDTO toDTO(Cargo cargo) {
        return new CargoDTO(cargo.getIdCargo(), cargo.getNombre(), cargo.getDescripcion());
    }
}
