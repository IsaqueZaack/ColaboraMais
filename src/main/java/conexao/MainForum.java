package conexao;

import modelo.Forum;
import modelo.ForumDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainForum {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        ForumDAO dao = new ForumDAO();

        /* Inserir */
        /*Forum forum = new Forum(5L, "Tecnologia", "Discussões sobre inovações em TI",
                LocalDate.parse("17/09/2025", mascara));
        dao.inserir(forum);*/

        /* Listar */
        /*System.out.println("📋 Lista de Fóruns:");
        List<Forum> lista = dao.listar();
        for (Forum f : lista) {
            System.out.println("ID Fórum: " + f.getId_forum());
            System.out.println("Título: " + f.getTitulo());
            System.out.println("Descrição: " + f.getDescricao());
            System.out.println("Data de Criação: " + f.getDt_criacao());
            System.out.println("==============================");
        }*/

        /* Alterar */
        /*Forum alterado = new Forum(1L, "Tecnologia e Inovação",
                "Discussões atualizadas sobre TI", LocalDate.parse("18/09/2025", mascara));
        dao.alterar(alterado);*/

        /* Deletar */
        /*dao.deletar(5L);
        System.out.println("✅ Exclusão concluída!");*/
    }
}
