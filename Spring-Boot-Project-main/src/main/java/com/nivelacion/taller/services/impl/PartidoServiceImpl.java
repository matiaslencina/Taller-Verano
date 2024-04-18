package com.nivelacion.taller.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nivelacion.taller.dtos.PartidoDTO;
import com.nivelacion.taller.exceptions.EmptyListException;
import com.nivelacion.taller.exceptions.ModelNotFoundException;
import com.nivelacion.taller.mappers.PartidoMapper;
import com.nivelacion.taller.models.Competencia;
import com.nivelacion.taller.models.Partido;
import com.nivelacion.taller.repository.CompetenciaRepository;
import com.nivelacion.taller.repository.PartidoRepository;
import com.nivelacion.taller.services.PartidoService;

import java.util.Optional;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PartidoServiceImpl implements PartidoService {

    @Autowired
    private PartidoRepository partidoRepository;

    @Autowired
    private PartidoMapper partidoMapper;

    @Autowired
    private CompetenciaRepository competenciaRepository;

    @Override
    public List<PartidoDTO> getPartidos() throws EmptyListException {
        List<Partido> modelList = partidoRepository.findAll();
        if (modelList == null || modelList.isEmpty()) {
            throw new EmptyListException("Lista de partidos vacía");
        }

        return partidoMapper.modelToDTO(modelList);
    }

    @Override
    public PartidoDTO savePartido(PartidoDTO dto) throws ModelNotFoundException {
        // Verificar si la competencia asociada al partido existe
        Long competenciaId = dto.getCompetencia().getId();
        Competencia competencia = competenciaRepository.findById(competenciaId)
                .orElseThrow(() -> new ModelNotFoundException(competenciaId, "Competencia"));

        // Si tiene un ID, buscar el partido en la base de datos
        Partido model = null;
        if (dto.getId() != null && dto.getId() != 0) {
            model = partidoRepository.findById(dto.getId()).orElse(null);
            if (model == null) {
                throw new ModelNotFoundException(dto.getId(), "Partido");
            }
        }

        // Mapear DTO a modelo
        model = partidoMapper.dto2Model(dto);

        // Asignar la competencia al modelo de partido
        model.setCompetencia(competencia);

        // Guardar el partido en la base de datos
        Partido modelSaved = partidoRepository.save(model);

        // Mapear modelo a DTO
        PartidoDTO result = partidoMapper.original2DTO(modelSaved);

        return result;
    }

    // nuevo
    @Override
    public void deletePartido(Long id) throws ModelNotFoundException {
        System.out.println("ID recibido para eliminar: " + id); // Agrega esta línea para verificar el ID recibido
        Partido partido = partidoRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException(id, "Partido"));
        partidoRepository.delete(partido);
    }

    // nuevo
    @Override
    public PartidoDTO updatePartido(Long id, PartidoDTO dto) throws ModelNotFoundException {
        // Verificar si el partido a actualizar existe en la base de datos
        Optional<Partido> partidoOptional = partidoRepository.findById(id);
        if (!partidoOptional.isPresent()) {
            throw new ModelNotFoundException(id, "Partido");
        }

        Partido partido = partidoOptional.get();

        // Verificar si la competencia asociada al partido existe
        Long competenciaId = dto.getCompetencia().getId();
        Competencia competencia = competenciaRepository.findById(competenciaId)
                .orElseThrow(() -> new ModelNotFoundException(competenciaId, "Competencia"));

        // Actualizar los datos del partido
        partido.setGoles_local(dto.getGoles_local());
        partido.setGoles_visitante(dto.getGoles_visitante());
        partido.setFecha_realizacion(dto.getFecha_realizacion());
        partido.setFecha_baja(dto.getFecha_baja());
        partido.setCompetencia(competencia);

        // Guardar los cambios en la base de datos
        partido = partidoRepository.save(partido);

        // Mapear el partido actualizado a DTO y devolverlo
        return partidoMapper.original2DTO(partido);
    }
    
}