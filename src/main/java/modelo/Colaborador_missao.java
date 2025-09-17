package modelo;

import java.time.LocalDate;

public class Colaborador_missao {
    private Long id_colaborador;
    private Long id_missao;
    private LocalDate dt_inicio;
    private LocalDate dt_conclusao;

    public Long getId_colaborador() {
        return id_colaborador;
    }

    public void setId_colaborador(Long id_colaborador) {
        this.id_colaborador = id_colaborador;
    }

    public Long getId_missao() {
        return id_missao;
    }

    public void setId_missao(Long id_missao) {
        this.id_missao = id_missao;
    }

    public LocalDate getDt_inicio() {
        return dt_inicio;
    }

    public void setDt_inicio(LocalDate dt_inicio) {
        this.dt_inicio = dt_inicio;
    }

    public LocalDate getDt_conclusao() {
        return dt_conclusao;
    }

    public void setDt_conclusao(LocalDate dt_conclusao) {
        this.dt_conclusao = dt_conclusao;
    }
}
