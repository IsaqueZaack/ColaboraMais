package modelo;

import java.time.LocalDate;

public class Forum {
    private Long id_forum;
    private String titulo;
    private String descricao;
    private LocalDate dt_criacao;

    public Forum(Long id_forum, String titulo, String descricao, LocalDate dt_criacao) {
        this.id_forum = id_forum;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dt_criacao = dt_criacao;
    }

    public Long getId_forum() {
        return id_forum;
    }

    public void setId_forum(Long id_forum) {
        this.id_forum = id_forum;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDt_criacao() {
        return dt_criacao;
    }

    public void setDt_criacao(LocalDate dt_criacao) {
        this.dt_criacao = dt_criacao;
    }
}
