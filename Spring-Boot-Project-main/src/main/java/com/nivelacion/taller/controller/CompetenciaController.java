package com.nivelacion.taller.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nivelacion.taller.dtos.CompetenciaDTO;
import com.nivelacion.taller.dtos.PartidoDTO;
import com.nivelacion.taller.exceptions.EmptyListException;
import com.nivelacion.taller.exceptions.ModelNotFoundException;
import com.nivelacion.taller.services.impl.CompetenciaServiceImpl;
import com.nivelacion.taller.services.impl.PartidoServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1")
@CrossOrigin
public class CompetenciaController {

    @Autowired
    private CompetenciaServiceImpl competenciaServiceImpl;

    @GetMapping("/competencias")
    public List<CompetenciaDTO> getCompetencias() throws EmptyListException {
        competenciaServiceImpl.generarFixture();
        return competenciaServiceImpl.getCompetencias();
    }

    @PostMapping("/competencia/save")
    public ResponseEntity<Object> save(@Valid @RequestBody CompetenciaDTO dto) {
        CompetenciaDTO dtoReturned = null;
        try {
            dtoReturned = this.competenciaServiceImpl.save(dto);
            dtoReturned.setFecha_creacion(LocalDateTime.now());
        } catch (ModelNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(dtoReturned);
    }

    // NUEVO
    @DeleteMapping("/competencias/{id}")
public ResponseEntity<Object> deleteCompetencia(@PathVariable Long id) {
    System.out.println("ID recibido para eliminar competencia: " + id); // Agrega esta línea para verificar el ID recibido
    try {
        competenciaServiceImpl.deleteCompetencia(id);
        return ResponseEntity.ok().build();
    } catch (ModelNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
}


// NUEVO
@PutMapping("/competencias/{id}")
    public ResponseEntity<Object> updateCompetencia(@PathVariable Long id, @Valid @RequestBody CompetenciaDTO dto) {
        CompetenciaDTO dtoReturned = null;
        try {
            // Configurar el ID de la competencia en el DTO
            dto.setId(id);
            
            // Llamar al servicio para actualizar la competencia
            dtoReturned = this.competenciaServiceImpl.save(dto);
            
            // Devolver la respuesta con el DTO actualizado
            return ResponseEntity.ok(dtoReturned);
        } catch (ModelNotFoundException e) {
            // Manejar el caso en el que la competencia no se encuentre
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

}