package com.nivelacion.taller.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clasificacion")
public class Clasificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_competidor", referencedColumnName = "id")
    private Participante competidor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_competencia", referencedColumnName = "id")
    private Competencia competencia;

    @Column(name = "nro_ganados", nullable = false)
    private Integer numeroGanados;

    @Column(name = "nro_empatados", nullable = false)
    private Integer numeroEmpatados;

    @Column(name = "nro_perdidos", nullable = false)
    private Integer numeroPerdidos;

    @Column(name = "fecha_baja")
    @DateTimeFormat(pattern = "dd-MM-YYYY HH:mm:ss")
    private LocalDateTime fecha_baja;

    public void setFechaBaja(LocalDateTime fechaBaja) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFechaBaja'");
    }
    
}
