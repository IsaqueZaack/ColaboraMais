package modelo;

public class Missoes {
    private Long id_missao;
    private String titulo;
    private String descricao;
    private int pontos_recompesa;

    public Long getId_missao() {
        return id_missao;
    }

    public void setId_missao(Long id_missao) {
        this.id_missao = id_missao;
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

    public int getPontos_recompesa() {
        return pontos_recompesa;
    }

    public void setPontos_recompesa(int pontos_recompesa) {
        this.pontos_recompesa = pontos_recompesa;
    }
}
