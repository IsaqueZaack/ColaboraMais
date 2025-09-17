package modelo;

import java.time.LocalDate;

public class Colaborador {
    private Long id_colaborador;
    private String nome;
    private String sobrenome;
    private String email;
    private LocalDate dt_contratacao;
    private String senha;
    private String tipo_usuario;

    public Long getId_colaborador() {
        return id_colaborador;
    }

    public void setId_colaborador(Long id_colaborador) {
        this.id_colaborador = id_colaborador;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDt_contratacao() {
        return dt_contratacao;
    }

    public void setDt_contratacao(LocalDate dt_contratacao) {
        this.dt_contratacao = dt_contratacao;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(String tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }
}
