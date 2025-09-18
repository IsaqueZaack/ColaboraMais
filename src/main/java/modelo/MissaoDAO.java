package modelo;

import conexao.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MissaoDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Missao missao) {
        sql = "insert into missoes (id_missao, titulo, descricao, pontos_recompensa) values (?, ?, ?, ?)";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, missao.getId_missao());
            ps.setString(2, missao.getTitulo());
            ps.setString(3, missao.getDescricao());
            ps.setInt(4, missao.getPontos_recompensa());
            ps.execute();
            System.out.println("✅ Missão inserida com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir missão\n" + e);
        }
    }

    public List<Missao> listar() {
        List<Missao> lista = new ArrayList<>();
        sql = "select * from missoes";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                Missao missao = new Missao();
                missao.setId_missao(rs.getLong("id_missao"));
                missao.setTitulo(rs.getString("titulo"));
                missao.setDescricao(rs.getString("descricao"));
                missao.setPontos_recompensa(rs.getInt("pontos_recompensa"));
                lista.add(missao);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar missões\n" + e);
        }
        return lista;
    }

    public void alterar(Missao missao) {
        sql = "update missoes set titulo = ?, descricao = ?, pontos_recompensa = ? where id_missao = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setString(1, missao.getTitulo());
            ps.setString(2, missao.getDescricao());
            ps.setInt(3, missao.getPontos_recompensa());
            ps.setLong(4, missao.getId_missao());
            ps.executeUpdate();
            System.out.println("✅ Missão alterada com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar missão\n" + e);
        }
    }

    public void deletar(Long id_missao) {
        sql = "delete from missoes where id_missao = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, id_missao);
            ps.executeUpdate();
            System.out.println("✅ Missão deletada com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao deletar missão\n" + e);
        }
    }
}

