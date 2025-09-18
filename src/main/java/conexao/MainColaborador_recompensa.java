package conexao;

import modelo.Colaborador_recompensa;
import modelo.Colaborador_recompensaDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainColaborador_recompensa {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Colaborador_recompensaDAO dao = new Colaborador_recompensaDAO();
        Colaborador_recompensa cr = new Colaborador_recompensa();

        /* ===== INSERIR ===== */
        /*cr.setId_colaborador(1L); // precisa existir em colaboradores
        cr.setId_recompensa(1L); // precisa existir em recompensas
        cr.setDt_conquista(LocalDate.parse("15/09/2025", mascara));
        dao.inserir(cr);*/

        /* ===== LISTAR ===== */
        /*List<Colaborador_recompensa> lista = dao.listar();
        for (Colaborador_recompensa c : lista) {
            System.out.println("🔹 ID Colaborador: " + c.getId_colaborador());
            System.out.println("🎁 ID Recompensa: " + c.getId_recompensa());
            System.out.println("📅 Data Conquista: " + c.getDt_conquista());
            System.out.println("=====================================");
        }*/

        /* ===== ALTERAR ===== */
        /*Colaborador_recompensa alterado = new Colaborador_recompensa();
        alterado.setId_colaborador(1L);
        alterado.setId_recompensa(1L);
        alterado.setDt_conquista(LocalDate.parse("20/09/2025", mascara));
        dao.alterar(alterado);*/

        /* ===== DELETAR ===== */
//        dao.deletar(1L, 1L);
    }
}
