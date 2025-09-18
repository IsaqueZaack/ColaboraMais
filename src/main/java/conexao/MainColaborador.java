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

        colaborador.setId_colaborador(1L);
        colaborador.setNome("José");
        colaborador.setSobrenome("Santos");
        colaborador.setEmail("jose3@gmail.com");
        colaborador.setDt_contratacao(LocalDate.parse("16/09/2025", mascara));
        colaborador.setSenha("jose123");
        colaborador.setTipo_usuario("mentor");

        dao.inserir(colaborador);

        /*List<Colaborador> lista = dao.listar();
        for (Colaborador c : lista) {
            System.out.println(c.getId_colaborador());
            System.out.println(c.getNome());
            System.out.println(c.getSobrenome());
            System.out.println(c.getEmail());
            System.out.println(c.getDt_contratacao());
            System.out.println(c.getSenha());
            System.out.println(c.getTipo_usuario());
            System.out.println("=====================================");
        }*/

        /*Colaborador alterado = new Colaborador();
        alterado.setId_colaborador(1L);
        alterado.setNome("José");
        alterado.setSobrenome("Santos");
        alterado.setEmail("jose2@gmail.com");
        alterado.setDt_contratacao(LocalDate.parse("16/09/2025", mascara));
        alterado.setSenha("12345678");
        alterado.setTipo_usuario("mentor");

        dao.alterar(alterado);*/

//        dao.deletar(1L);
//        System.out.println("Exclusão concluída!");
    }
}
