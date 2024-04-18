package com.nivelacion.taller.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nivelacion.taller.dtos.ClasificacionDTO;
import com.nivelacion.taller.exceptions.EmptyListException;
import com.nivelacion.taller.exceptions.ModelNotFoundException;
import com.nivelacion.taller.mappers.ClasificacionMapper;
import com.nivelacion.taller.models.Clasificacion;
import com.nivelacion.taller.repository.ClasificacionRepository;
import com.nivelacion.taller.services.ClasificacionService;

@Service
public class ClasificacionServicesImpl implements ClasificacionService {

    @Autowired
    private ClasificacionRepository clasificacionRepository;

    @Autowired
    private ClasificacionMapper clasificacionMapper;

    @Override
    public List<ClasificacionDTO> getClasificaciones() throws EmptyListException {
        List<Clasificacion> modelList = clasificacionRepository.findAll();
        if (modelList == null || modelList.isEmpty()) {
            throw new EmptyListException("Lista de clasificaciones vacía");
        }

        return clasificacionMapper.modelToDTO(modelList);
    }

    @Override
    public ClasificacionDTO save(ClasificacionDTO dto) throws ModelNotFoundException {
        return dto;
        // Implementa la lógica de guardado similar a CompetenciaServiceImpl.save
        // Utiliza el ClasificacionRepository y el ClasificacionMapper
    }

    public void deleteClasificacion(ClasificacionDTO clasificacionDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteClasificacion'");
    }

    public ClasificacionDTO updateClasificacion(Long id, ClasificacionDTO clasificacionDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateClasificacion'");
    }



    public ClasificacionDTO getClasificacionById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getClasificacionById'");
    }

    public List<ClasificacionDTO> getAllClasificaciones() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllClasificaciones'");
    }

    public ClasificacionDTO createClasificacion(ClasificacionDTO clasificacionDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createClasificacion'");
    }

    public void deleteClasificacion(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteClasificacion'");
    }

}
