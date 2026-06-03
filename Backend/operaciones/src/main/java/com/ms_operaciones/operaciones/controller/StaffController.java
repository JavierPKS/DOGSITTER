package com.ms_operaciones.operaciones.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ms_operaciones.operaciones.dto.StaffAssignmentRequestDTO;
import com.ms_operaciones.operaciones.dto.StaffAssignmentResponseDTO;
import com.ms_operaciones.operaciones.service.StaffService;

@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/calcular-requerido")
    public ResponseEntity<StaffAssignmentResponseDTO> calcularStaffRequerido(
            @Valid @RequestBody StaffAssignmentRequestDTO request) {
        StaffAssignmentResponseDTO response = staffService.calcularStaffRequerido(request);
        return ResponseEntity.ok(response);
    }
}
