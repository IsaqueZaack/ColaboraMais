package modelo;

public class Recompensa {
    private Long id_recompensa;
    private String nome;
    private String descricao;

    public Long getId_recompensa() {
        return id_recompensa;
    }

    public void setId_recompensa(Long id_recompensa) {
        this.id_recompensa = id_recompensa;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
