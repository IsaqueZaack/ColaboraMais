package modelo;

import conexao.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ColaboradorDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Colaborador colaborador) {
        sql = "insert into colaboradores values (?, ?, ?, ?, ?, ?, ?)"; // seqc.nextval --> outra opção

        try(Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, colaborador.getId_colaborador());
            ps.setString(2, colaborador.getNome());
            ps.setString(3, colaborador.getSobrenome());
            ps.setString(4, colaborador.getEmail());
            ps.setDate(5, Date.valueOf(colaborador.getDt_contratacao()));
            ps.setString(6, colaborador.getSenha());
            ps.setString(7, colaborador.getTipo_usuario());
            ps.execute();
        }

        catch(SQLException e) {
            System.out.println("erro ao inserir colaborador\n" + e);
        }
    }

    public List<Colaborador> listar() {
        List<Colaborador> lista = new ArrayList<>();
        sql = "select * from colaboradores";

        try(Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()) {
                Colaborador colaborador = new Colaborador();
                            colaborador.setId_colaborador(rs.getLong("id_colaborador"));
                            colaborador.setNome(rs.getString("nome"));
                            colaborador.setSobrenome(rs.getString("sobrenome"));
                            colaborador.setEmail(rs.getString("email"));
                            colaborador.setDt_contratacao(rs.getDate("dt_contratacao").toLocalDate());
                            colaborador.setSenha(rs.getString("senha"));
                            colaborador.setTipo_usuario(rs.getString("tipo_usuario"));
                lista.add(colaborador);
            }
        }
        catch (SQLException e) {
            System.out.println("erro ao listar colaborador\n" + e);
        }
        return lista;
    }

    public void alterar(Colaborador colaborador) {
        sql = "update colaboradores set nome = ?, sobrenome = ?, email = ?, dt_contratacao = ?, senha = ?, tipo_usuario = ? where id_colaborador = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setString(1, colaborador.getNome());
            ps.setString(2, colaborador.getSobrenome());
            ps.setString(3, colaborador.getEmail());
            ps.setDate(4, Date.valueOf(colaborador.getDt_contratacao()));
            ps.setString(5, colaborador.getSenha());
            ps.setString(6, colaborador.getTipo_usuario());
            ps.setLong(7, colaborador.getId_colaborador());
            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Erro ao alterar colaborador\n" + e);
        }
    }

    public void deletar(Long id_colaborador) {
        sql = "delete from colaboradores where id_colaborador = ?";

        try (Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            ps.setLong(1, id_colaborador);
            ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Erro ao deletar colaborador\n" + e);
        }
    }
}
