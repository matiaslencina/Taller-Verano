package com.nivelacion.taller.dtos;

import java.time.LocalDateTime;

public class ClasificacionDTO {

    private Long id;
    
    private ParticipanteDTO competidor;
    private CompetenciaDTO competencia;
    private Integer numeroGanados;
    private Integer numeroEmpatados;
    private Integer numeroPerdidos;
    private LocalDateTime fechaBaja;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ParticipanteDTO getCompetidor() {
        return competidor;
    }

    public void setCompetidor(ParticipanteDTO competidor) {
        this.competidor = competidor;
    }

    public CompetenciaDTO getCompetencia() {
        return competencia;
    }

    public void setCompetencia(CompetenciaDTO competencia) {
        this.competencia = competencia;
    }

    public Integer getNumeroGanados() {
        return numeroGanados;
    }

    public void setNumeroGanados(Integer numeroGanados) {
        this.numeroGanados = numeroGanados;
    }

    public Integer getNumeroEmpatados() {
        return numeroEmpatados;
    }

    public void setNumeroEmpatados(Integer numeroEmpatados) {
        this.numeroEmpatados = numeroEmpatados;
    }

    public Integer getNumeroPerdidos() {
        return numeroPerdidos;
    }

    public void setNumeroPerdidos(Integer numeroPerdidos) {
        this.numeroPerdidos = numeroPerdidos;
    }

    public LocalDateTime getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(LocalDateTime fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public void setFecha_baja(LocalDateTime fecha_baja) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFecha_baja'");
    }
}
