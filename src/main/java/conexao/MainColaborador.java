package conexao;

import modelo.Colaborador;
import modelo.ColaboradorDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainColaborador {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        ColaboradorDAO dao = new ColaboradorDAO();
        Colaborador colaborador = new Colaborador();

        //colaborador.setId_colaborador(1L);
        colaborador.setNome("José");
        colaborador.setSobrenome("Santos");
        colaborador.setEmail("jose@gmail.com");
        colaborador.setDt_contratacao(LocalDate.parse("16/09/2025", mascara));
        colaborador.setSenha("jose123");
        colaborador.setTipo_usuario("mentor");

        dao.inserir(colaborador);

    }
}
