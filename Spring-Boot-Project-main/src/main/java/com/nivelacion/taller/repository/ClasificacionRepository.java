package com.nivelacion.taller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nivelacion.taller.models.Clasificacion;

@Repository
public interface ClasificacionRepository extends JpaRepository<Clasificacion, Long> {

}