package conexao;

import modelo.Recompensa;
import modelo.RecompensaDAO;

import java.util.List;

public class MainRecompensa {
    public static void main(String[] args) {
        RecompensaDAO dao = new RecompensaDAO();
        Recompensa recompensa = new Recompensa();

        /* ===== INSERIR ===== */
        /*recompensa.setId_recompensa(1L);
        recompensa.setNome("Medalha de Ouro");
        recompensa.setDescricao("Concedida ao colaborador que conclui todas as missões mensais.");
        dao.inserir(recompensa);*/

        /* ===== LISTAR ===== */
       /* List<Recompensa> lista = dao.listar();
        for (Recompensa r : lista) {
            System.out.println("🎁 ID Recompensa: " + r.getId_recompensa());
            System.out.println("🏅 Nome: " + r.getNome());
            System.out.println("📝 Descrição: " + r.getDescricao());
            System.out.println("=====================================");
        }
*/
        /* ===== ALTERAR ===== */
        /*Recompensa alterada = new Recompensa();
        alterada.setId_recompensa(1L);
        alterada.setNome("Medalha de Platina");
        alterada.setDescricao("Concedida ao colaborador que conquista todas as recompensas disponíveis.");
        dao.alterar(alterada);*/

        /* ===== DELETAR ===== */
//        dao.deletar(1L);
    }
}
