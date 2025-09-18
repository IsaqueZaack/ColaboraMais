package conexao;

import modelo.Missao;
import modelo.MissaoDAO;

import java.util.List;

public class MainMissao {
    public static void main(String[] args) {
        MissaoDAO dao = new MissaoDAO();

        /* Inserir */
        /*Missao missao = new Missao();
        missao.setId_missao(1L);
        missao.setTitulo("Completar cadastro");
        missao.setDescricao("Finalize seu perfil para ganhar pontos.");
        missao.setPontos_recompensa(50);
        dao.inserir(missao);*/

        /* Listar */
        /*System.out.println("📋 Lista de Missões:");
        List<Missao> lista = dao.listar();
        for (Missao m : lista) {
            System.out.println("ID Missão: " + m.getId_missao());
            System.out.println("Título: " + m.getTitulo());
            System.out.println("Descrição: " + m.getDescricao());
            System.out.println("Pontos Recompensa: " + m.getPontos_recompensa());
            System.out.println("==============================");
        }*/

        /* Alterar */
        /*Missao alterada = new Missao();
        alterada.setId_missao(1L);
        alterada.setTitulo("Completar cadastro atualizado");
        alterada.setDescricao("Finalize todos os campos do perfil para ganhar pontos extras.");
        alterada.setPontos_recompensa(75);
        dao.alterar(alterada);*/

        /* Deletar */
       /* dao.deletar(1L);
        System.out.println("✅ Exclusão concluída!");*/
    }
}

