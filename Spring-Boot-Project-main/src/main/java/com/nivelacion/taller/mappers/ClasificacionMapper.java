package com.nivelacion.taller.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.nivelacion.taller.dtos.ClasificacionDTO;
import com.nivelacion.taller.models.Clasificacion;

@Component
public class ClasificacionMapper {

    public ClasificacionDTO entityToDto(Clasificacion clasificacion) {
        ClasificacionDTO dtoClasificacion = new ClasificacionDTO();
        dtoClasificacion.setId(clasificacion.getId());
        dtoClasificacion.setCompetidor(new ParticipanteMapper().entityToDto(clasificacion.getCompetidor()));
        dtoClasificacion.setCompetencia(new CompetenciaMapper().original2DTO(clasificacion.getCompetencia()));
        dtoClasificacion.setNumeroGanados(clasificacion.getNumeroGanados());
        dtoClasificacion.setNumeroEmpatados(clasificacion.getNumeroEmpatados());
        dtoClasificacion.setNumeroPerdidos(clasificacion.getNumeroPerdidos());
        dtoClasificacion.setFecha_baja(clasificacion.getFecha_baja());
        return dtoClasificacion;
    }

    public Clasificacion dtoToEntity(ClasificacionDTO dto) {
        Clasificacion clasificacion = new Clasificacion();
        clasificacion.setId(dto.getId());
        clasificacion.setCompetidor(new ParticipanteMapper().dtoToEntity(dto.getCompetidor()));
        clasificacion.setCompetencia(new CompetenciaMapper().dto2Model(dto.getCompetencia()));
        clasificacion.setNumeroGanados(dto.getNumeroGanados());
        clasificacion.setNumeroEmpatados(dto.getNumeroEmpatados());
        clasificacion.setNumeroPerdidos(dto.getNumeroPerdidos());
        clasificacion.setFechaBaja(dto.getFechaBaja());
        return clasificacion;
    }

    public List<ClasificacionDTO> entityListToDTOList(List<Clasificacion> clasificacionList) {
       return clasificacionList.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList()); 
    }

    public List<ClasificacionDTO> modelToDTO(List<Clasificacion> modelList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'modelToDTO'");
    }

}