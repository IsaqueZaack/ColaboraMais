package modelo;

import conexao.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Colaborador_recompensaDAO {

    public void inserir(Colaborador_recompensa cr) {
        String sql = "INSERT INTO colaborador_recompensa (id_colaborador, id_recompensa, dt_conquista) VALUES (?, ?, ?)";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, cr.getId_colaborador());
            stmt.setLong(2, cr.getId_recompensa());
            stmt.setDate(3, Date.valueOf(cr.getDt_conquista()));
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_recompensa inserido com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir colaborador_recompensa: " + e.getMessage());
        }
    }

    public List<Colaborador_recompensa> listar() {
        List<Colaborador_recompensa> lista = new ArrayList<>();
        String sql = "SELECT * FROM colaborador_recompensa";

        try (Connection conn = Conexao.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Colaborador_recompensa cr = new Colaborador_recompensa();
                cr.setId_colaborador(rs.getLong("id_colaborador"));
                cr.setId_recompensa(rs.getLong("id_recompensa"));
                cr.setDt_conquista(rs.getDate("dt_conquista").toLocalDate());
                lista.add(cr);
            }

        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar colaborador_recompensa: " + e.getMessage());
        }

        return lista;
    }

    public void alterar(Colaborador_recompensa cr) {
        String sql = "UPDATE colaborador_recompensa SET dt_conquista = ? WHERE id_colaborador = ? AND id_recompensa = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setDate(1, Date.valueOf(cr.getDt_conquista()));
            stmt.setLong(2, cr.getId_colaborador());
            stmt.setLong(3, cr.getId_recompensa());
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_recompensa alterado com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar colaborador_recompensa: " + e.getMessage());
        }
    }

    public void deletar(Long id_colaborador, Long id_recompensa) {
        String sql = "DELETE FROM colaborador_recompensa WHERE id_colaborador = ? AND id_recompensa = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id_colaborador);
            stmt.setLong(2, id_recompensa);
            stmt.executeUpdate();

            System.out.println("✅ Colaborador_recompensa excluído com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao excluir colaborador_recompensa: " + e.getMessage());
        }
    }
}
