package modelo;

import conexao.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RecompensaDAO {

    public void inserir(Recompensa recompensa) {
        String sql = "INSERT INTO recompensas (id_recompensa, nome, descricao) VALUES (?, ?, ?)";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, recompensa.getId_recompensa());
            stmt.setString(2, recompensa.getNome());
            stmt.setString(3, recompensa.getDescricao());
            stmt.executeUpdate();

            System.out.println("✅ Recompensa inserida com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir recompensa: " + e.getMessage());
        }
    }

    public List<Recompensa> listar() {
        List<Recompensa> lista = new ArrayList<>();
        String sql = "SELECT * FROM recompensas";

        try (Connection conn = Conexao.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Recompensa r = new Recompensa();
                r.setId_recompensa(rs.getLong("id_recompensa"));
                r.setNome(rs.getString("nome"));
                r.setDescricao(rs.getString("descricao"));
                lista.add(r);
            }

        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar recompensas: " + e.getMessage());
        }

        return lista;
    }

    public void alterar(Recompensa recompensa) {
        String sql = "UPDATE recompensas SET nome = ?, descricao = ? WHERE id_recompensa = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, recompensa.getNome());
            stmt.setString(2, recompensa.getDescricao());
            stmt.setLong(3, recompensa.getId_recompensa());
            stmt.executeUpdate();

            System.out.println("✅ Recompensa alterada com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar recompensa: " + e.getMessage());
        }
    }

    public void deletar(Long id_recompensa) {
        String sql = "DELETE FROM recompensas WHERE id_recompensa = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id_recompensa);
            stmt.executeUpdate();

            System.out.println("✅ Recompensa excluída com sucesso!");

        } catch (SQLException e) {
            System.out.println("❌ Erro ao excluir recompensa: " + e.getMessage());
        }
    }
}

