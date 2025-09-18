package modelo;

import conexao.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MentoriaDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Mentoria mentoria) {
        sql = "insert into mentoria (id_mentoria, dt_inicio, dt_fim, id_colaborador) values (?, ?, ?, ?)";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, mentoria.getId_mentoria());
            ps.setDate(2, Date.valueOf(mentoria.getDt_inicio()));
            ps.setDate(3, Date.valueOf(mentoria.getDt_fim()));
            ps.setLong(4, mentoria.getId_colaborador());
            ps.execute();
            System.out.println("✅ Mentoria inserida com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao inserir mentoria\n" + e);
        }
    }

    public List<Mentoria> listar() {
        List<Mentoria> lista = new ArrayList<>();
        sql = "select * from mentoria";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                Mentoria mentoria = new Mentoria();
                mentoria.setId_mentoria(rs.getLong("id_mentoria"));
                mentoria.setDt_inicio(rs.getDate("dt_inicio").toLocalDate());
                mentoria.setDt_fim(rs.getDate("dt_fim").toLocalDate());
                mentoria.setId_colaborador(rs.getLong("id_colaborador"));
                lista.add(mentoria);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erro ao listar mentorias\n" + e);
        }
        return lista;
    }

    public void alterar(Mentoria mentoria) {
        sql = "update mentoria set dt_inicio = ?, dt_fim = ?, id_colaborador = ? where id_mentoria = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setDate(1, Date.valueOf(mentoria.getDt_inicio()));
            ps.setDate(2, Date.valueOf(mentoria.getDt_fim()));
            ps.setLong(3, mentoria.getId_colaborador());
            ps.setLong(4, mentoria.getId_mentoria());
            ps.executeUpdate();
            System.out.println("✅ Mentoria alterada com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao alterar mentoria\n" + e);
        }
    }

    public void deletar(Long id_mentoria) {
        sql = "delete from mentoria where id_mentoria = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, id_mentoria);
            ps.executeUpdate();
            System.out.println("✅ Mentoria deletada com sucesso!");
        } catch (SQLException e) {
            System.out.println("❌ Erro ao deletar mentoria\n" + e);
        }
    }
}
