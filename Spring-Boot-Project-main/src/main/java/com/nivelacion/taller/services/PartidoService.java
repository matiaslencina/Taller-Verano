package com.nivelacion.taller.services;

import java.util.List;

import com.nivelacion.taller.dtos.CompetenciaDTO;
import com.nivelacion.taller.dtos.PartidoDTO;
import com.nivelacion.taller.exceptions.EmptyListException;
import com.nivelacion.taller.exceptions.ModelNotFoundException;

public interface PartidoService {

    List<PartidoDTO> getPartidos() throws EmptyListException;

    PartidoDTO savePartido(PartidoDTO dto) throws ModelNotFoundException;

    // nuevo
    void deletePartido(Long id) throws ModelNotFoundException;

    // nuevo
    PartidoDTO updatePartido(Long id, PartidoDTO dto) throws ModelNotFoundException;


}