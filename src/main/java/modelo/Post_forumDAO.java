package modelo;

import conexao.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Post_forumDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Post_forum post) {
        sql = "insert into post_forum (id_post, id_colaborador, conteudo, dt_post, id_forum) values (?, ?, ?, ?, ?)";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, post.getId_post());
            ps.setLong(2, post.getId_colaborador());
            ps.setString(3, post.getConteudo());
            ps.setDate(4, Date.valueOf(post.getDt_post()));
            ps.setLong(5, post.getId_forum());
            ps.execute();
            System.out.println("✅ Post inserido com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir post\n" + e);
        }
    }

    public List<Post_forum> listar() {
        List<Post_forum> lista = new ArrayList<>();
        sql = "select * from post_forum";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                Post_forum post = new Post_forum();
                post.setId_post(rs.getLong("id_post"));
                post.setId_colaborador(rs.getLong("id_colaborador"));
                post.setConteudo(rs.getString("conteudo"));
                Date data = rs.getDate("dt_post");
                if (data != null) {
                    post.setDt_post(data.toLocalDate());
                }
                post.setId_forum(rs.getLong("id_forum"));
                lista.add(post);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar posts\n" + e);
        }
        return lista;
    }

    public void alterar(Post_forum post) {
        sql = "update post_forum set id_colaborador = ?, conteudo = ?, dt_post = ?, id_forum = ? where id_post = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, post.getId_colaborador());
            ps.setString(2, post.getConteudo());
            ps.setDate(3, Date.valueOf(post.getDt_post()));
            ps.setLong(4, post.getId_forum());
            ps.setLong(5, post.getId_post());
            ps.executeUpdate();
            System.out.println("✅ Post alterado com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar post\n" + e);
        }
    }

    public void deletar(Long id_post) {
        sql = "delete from post_forum where id_post = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, id_post);
            ps.executeUpdate();
            System.out.println("✅ Post deletado com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao deletar post\n" + e);
        }
    }
}
