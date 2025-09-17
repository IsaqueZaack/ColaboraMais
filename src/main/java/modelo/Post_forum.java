package modelo;

import java.time.LocalDate;

public class Post_forum {
    private Long id_post;
    private Long id_colaborador;
    private String conteudo;
    private LocalDate dt_post;
    private Long id_forum;

    public Long getId_post() {
        return id_post;
    }

    public void setId_post(Long id_post) {
        this.id_post = id_post;
    }

    public Long getId_colaborador() {
        return id_colaborador;
    }

    public void setId_colaborador(Long id_colaborador) {
        this.id_colaborador = id_colaborador;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public LocalDate getDt_post() {
        return dt_post;
    }

    public void setDt_post(LocalDate dt_post) {
        this.dt_post = dt_post;
    }

    public Long getId_forum() {
        return id_forum;
    }

    public void setId_forum(Long id_forum) {
        this.id_forum = id_forum;
    }
}
