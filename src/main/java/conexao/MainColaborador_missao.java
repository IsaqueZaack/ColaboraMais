package conexao;

import modelo.Colaborador_missao;
import modelo.Colaborador_missaoDAO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MainColaborador_missao {
    public static void main(String[] args) {
        DateTimeFormatter mascara = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Colaborador_missaoDAO dao = new Colaborador_missaoDAO();
        Colaborador_missao cm = new Colaborador_missao();

        /* ===== INSERIR ===== */
        /*cm.setId_colaborador(1L); // precisa existir na tabela colaboradores
        cm.setId_missao(1L); // precisa existir na tabela missoes
        cm.setDt_inicio(LocalDate.parse("01/09/2025", mascara));
        cm.setDt_conclusao(LocalDate.parse("30/09/2025", mascara));
        dao.inserir(cm);*/

        /* ===== LISTAR ===== */
       /* List<Colaborador_missao> lista = dao.listar();
        for (Colaborador_missao c : lista) {
            System.out.println("🔹 ID Colaborador: " + c.getId_colaborador());
            System.out.println("🔹 ID Missão: " + c.getId_missao());
            System.out.println("📅 Data Início: " + c.getDt_inicio());
            System.out.println("📅 Data Conclusão: " + c.getDt_conclusao());
            System.out.println("=====================================");
        }*/

        /* ===== ALTERAR ===== */
        /*Colaborador_missao alterado = new Colaborador_missao();
        alterado.setId_colaborador(1L);
        alterado.setId_missao(1L);
        alterado.setDt_inicio(LocalDate.parse("05/09/2025", mascara));
        alterado.setDt_conclusao(LocalDate.parse("10/10/2025", mascara));
        dao.alterar(alterado);*/

        /* ===== DELETAR ===== */
        dao.deletar(1L, 1L);
    }
}

