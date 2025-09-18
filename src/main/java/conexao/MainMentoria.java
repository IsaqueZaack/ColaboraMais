package conexao;

import modelo.Mentoria;
import modelo.MentoriaDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainMentoria {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        MentoriaDAO dao = new MentoriaDAO();
        Mentoria mentoria = new Mentoria();

        /* Inserir (precisa já existir um colaborador com ID = 1) */
        /*mentoria.setId_mentoria(3L);
        mentoria.setDt_inicio(LocalDate.parse("01/09/2025", mascara));
        mentoria.setDt_fim(LocalDate.parse("30/09/2025", mascara));
        mentoria.setId_colaborador(1L);
        dao.inserir(mentoria);*/

        /* Listar */
        /*System.out.println("📋 Lista de mentorias cadastradas:");
        List<Mentoria> lista = dao.listar();
        for (Mentoria m : lista) {
            System.out.println("ID Mentoria: " + m.getId_mentoria());
            System.out.println("Data Início: " + m.getDt_inicio());
            System.out.println("Data Fim: " + m.getDt_fim());
            System.out.println("ID Colaborador (FK): " + m.getId_colaborador());
            System.out.println("==============================");
        }*/

        /* Alterar */
        /*Mentoria alterada = new Mentoria();
        alterada.setId_mentoria(1L);
        alterada.setDt_inicio(LocalDate.parse("05/09/2025", mascara));
        alterada.setDt_fim(LocalDate.parse("20/09/2025", mascara));
        alterada.setId_colaborador(1L);
        dao.alterar(alterada);*/

        /* Deletar */
        /*dao.deletar(1L);
        System.out.println("✅ Exclusão concluída!");*/
    }
}
