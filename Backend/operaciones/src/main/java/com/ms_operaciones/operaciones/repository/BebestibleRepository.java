package com.ms_operaciones.operaciones.repository;

import com.ms_operaciones.operaciones.entity.Bebestible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BebestibleRepository extends JpaRepository<Bebestible, Integer> {
}
