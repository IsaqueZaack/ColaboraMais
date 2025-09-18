package conexao;

import modelo.Post_forum;
import modelo.Post_forumDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainPost_forum {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Post_forumDAO dao = new Post_forumDAO();
        Post_forum post = new Post_forum();

        /* ---------- INSERIR ----------
         * OBS: para inserir, certifique-se de que já exista:
         *  - um colaborador com id_colaborador = 1
         *  - um forum com id_forum = 1
         */
        /*post.setId_post(1L);
        post.setId_colaborador(1L); // FK -> colaboradores
        post.setConteudo("Esse é meu primeiro post no fórum!");
        post.setDt_post(LocalDate.parse("16/09/2025", mascara));
        post.setId_forum(1L); // FK -> forum
        dao.inserir(post);*/

        /* ---------- LISTAR ---------- */
        /*System.out.println("📋 Lista de posts no fórum:");
        List<Post_forum> lista = dao.listar();
        for (Post_forum p : lista) {
            System.out.println("ID Post: " + p.getId_post());
            System.out.println("ID Colaborador (FK): " + p.getId_colaborador());
            System.out.println("Conteúdo: " + p.getConteudo());
            System.out.println("Data do Post: " + p.getDt_post());
            System.out.println("ID Fórum (FK): " + p.getId_forum());
            System.out.println("==============================");
        }*/

        /* ---------- ALTERAR ----------
         * Exemplo: editar o post com id_post = 1
         */
        /*Post_forum alterado = new Post_forum();
        alterado.setId_post(1L);
        alterado.setId_colaborador(1L);
        alterado.setConteudo("Post editado com mais detalhes!");
        alterado.setDt_post(LocalDate.parse("17/09/2025", mascara));
        alterado.setId_forum(1L);
        dao.alterar(alterado);*/

        /* ---------- DELETAR ----------
         * Exemplo: deletar post com id_post = 1
         */
         /*dao.deletar(1L);
         System.out.println("✅ Exclusão concluída!");*/
    }
}
