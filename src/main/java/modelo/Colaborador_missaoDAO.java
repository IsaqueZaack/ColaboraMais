package modelo;

import conexao.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Colaborador_missaoDAO {

    public void inserir(Colaborador_missao colaboradorMissao) {
        String sql = "INSERT INTO colaborador_missao (id_colaborador, id_missao, dt_inicio, dt_conclusao) VALUES (?, ?, ?, ?)";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, colaboradorMissao.getId_colaborador());
            stmt.setLong(2, colaboradorMissao.getId_missao());
            stmt.setDate(3, Date.valueOf(colaboradorMissao.getDt_inicio()));
            stmt.setDate(4, Date.valueOf(colaboradorMissao.getDt_conclusao()));
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_missao inserido com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir colaborador_missao: " + e.getMessage());
        }
    }

    public List<Colaborador_missao> listar() {
        List<Colaborador_missao> lista = new ArrayList<>();
        String sql = "SELECT * FROM colaborador_missao";

        try (Connection conn = Conexao.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Colaborador_missao cm = new Colaborador_missao();
                cm.setId_colaborador(rs.getLong("id_colaborador"));
                cm.setId_missao(rs.getLong("id_missao"));
                cm.setDt_inicio(rs.getDate("dt_inicio").toLocalDate());
                cm.setDt_conclusao(rs.getDate("dt_conclusao").toLocalDate());
                lista.add(cm);
            }

        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar colaboradores_missao: " + e.getMessage());
        }

        return lista;
    }

    public void alterar(Colaborador_missao colaboradorMissao) {
        String sql = "UPDATE colaborador_missao SET dt_inicio = ?, dt_conclusao = ? WHERE id_colaborador = ? AND id_missao = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setDate(1, Date.valueOf(colaboradorMissao.getDt_inicio()));
            stmt.setDate(2, Date.valueOf(colaboradorMissao.getDt_conclusao()));
            stmt.setLong(3, colaboradorMissao.getId_colaborador());
            stmt.setLong(4, colaboradorMissao.getId_missao());
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_missao alterado com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar colaborador_missao: " + e.getMessage());
        }
    }

    public void deletar(Long id_colaborador, Long id_missao) {
        String sql = "DELETE FROM colaborador_missao WHERE id_colaborador = ? AND id_missao = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id_colaborador);
            stmt.setLong(2, id_missao);
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_missao excluído com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao excluir colaborador_missao: " + e.getMessage());
        }
    }
}
