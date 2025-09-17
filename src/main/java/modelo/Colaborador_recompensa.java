package modelo;

import java.time.LocalDate;

public class Colaborador_recompensa {
    private Long id_colaborador;
    private Long id_recompensa;
    private LocalDate dt_conquista;

    public Long getId_colaborador() {
        return id_colaborador;
    }

    public void setId_colaborador(Long id_colaborador) {
        this.id_colaborador = id_colaborador;
    }

    public Long getId_recompensa() {
        return id_recompensa;
    }

    public void setId_recompensa(Long id_recompensa) {
        this.id_recompensa = id_recompensa;
    }

    public LocalDate getDt_conquista() {
        return dt_conquista;
    }

    public void setDt_conquista(LocalDate dt_conquista) {
        this.dt_conquista = dt_conquista;
    }
}
