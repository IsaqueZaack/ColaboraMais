package modelo;

import java.time.LocalDate;

public class Mentoria {
    private Long id_mentoria;
    private LocalDate dt_inicio;
    private LocalDate dt_fim;
    private Long id_colaborador;

    public Long getId_mentoria() {
        return id_mentoria;
    }

    public void setId_mentoria(Long id_mentoria) {
        this.id_mentoria = id_mentoria;
    }

    public LocalDate getDt_inicio() {
        return dt_inicio;
    }

    public void setDt_inicio(LocalDate dt_inicio) {
        this.dt_inicio = dt_inicio;
    }

    public LocalDate getDt_fim() {
        return dt_fim;
    }

    public void setDt_fim(LocalDate dt_fim) {
        this.dt_fim = dt_fim;
    }

    public Long getId_colaborador() {
        return id_colaborador;
    }

    public void setId_colaborador(Long id_colaborador) {
        this.id_colaborador = id_colaborador;
    }
}
