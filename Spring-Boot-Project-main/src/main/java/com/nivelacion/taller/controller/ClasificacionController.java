package com.nivelacion.taller.controller;

import com.nivelacion.taller.dtos.ClasificacionDTO;
import com.nivelacion.taller.exceptions.EmptyListException;
import com.nivelacion.taller.exceptions.ModelNotFoundException;
import com.nivelacion.taller.services.impl.ClasificacionServicesImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clasificaciones")
public class ClasificacionController {

    private final ClasificacionServicesImpl clasificacionService;

    public ClasificacionController(ClasificacionServicesImpl clasificacionService) {
        this.clasificacionService = clasificacionService;
    }

    @GetMapping
    public List<ClasificacionDTO> getAllClasificaciones() throws EmptyListException {
        return clasificacionService.getAllClasificaciones();
    }

    @GetMapping("/{id}")
    public ClasificacionDTO getClasificacionById(@PathVariable Long id) throws ModelNotFoundException {
        return clasificacionService.getClasificacionById(id);
    }

    @PostMapping
    public ClasificacionDTO createClasificacion(@RequestBody ClasificacionDTO clasificacionDTO) {
        return clasificacionService.createClasificacion(clasificacionDTO);
    }

    @PutMapping("/{id}")
    public ClasificacionDTO updateClasificacion(@PathVariable Long id, @RequestBody ClasificacionDTO clasificacionDTO)
            throws ModelNotFoundException {
        return clasificacionService.updateClasificacion(id, clasificacionDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteClasificacion(@PathVariable Long id) throws ModelNotFoundException {
        clasificacionService.deleteClasificacion(id);
    }
}
