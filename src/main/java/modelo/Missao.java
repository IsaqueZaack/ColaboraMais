package modelo;

public class Missao {
    private Long id_missao;
    private String titulo;
    private String descricao;
    private int pontos_recompensa;

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

    public int getPontos_recompensa() {
        return pontos_recompensa;
    }

    public void setPontos_recompensa(int pontos_recompensa) {
        this.pontos_recompensa = this.pontos_recompensa;
    }
}
