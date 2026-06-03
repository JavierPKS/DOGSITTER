package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.MenuCanino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCaninoRepository extends JpaRepository<MenuCanino, Integer> {
}
