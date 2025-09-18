package modelo;

import conexao.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ForumDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Forum forum) {
        sql = "insert into forum (id_forum, titulo, descricao, dt_criacao) values (?, ?, ?, ?)";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, forum.getId_forum());
            ps.setString(2, forum.getTitulo());
            ps.setString(3, forum.getDescricao());
            ps.setDate(4, Date.valueOf(forum.getDt_criacao()));
            ps.execute();
            System.out.println("✅ Fórum inserido com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir fórum\n" + e);
        }
    }

    public List<Forum> listar() {
        List<Forum> lista = new ArrayList<>();
        sql = "select * from forum";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                Forum forum = new Forum(
                        rs.getLong("id_forum"),
                        rs.getString("titulo"),
                        rs.getString("descricao"),
                        rs.getDate("dt_criacao").toLocalDate()
                );
                lista.add(forum);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar fóruns\n" + e);
        }
        return lista;
    }

    public void alterar(Forum forum) {
        sql = "update forum set titulo = ?, descricao = ?, dt_criacao = ? where id_forum = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setString(1, forum.getTitulo());
            ps.setString(2, forum.getDescricao());
            ps.setDate(3, Date.valueOf(forum.getDt_criacao()));
            ps.setLong(4, forum.getId_forum());
            ps.executeUpdate();
            System.out.println("✅ Fórum alterado com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar fórum\n" + e);
        }
    }

    public void deletar(Long id_forum) {
        sql = "delete from forum where id_forum = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, id_forum);
            ps.executeUpdate();
            System.out.println("✅ Fórum deletado com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao deletar fórum\n" + e);
        }
    }
}
