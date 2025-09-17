package modelo;

import conexao.Conexao;

import java.sql.*;

public class ColaboradorDAO {
    private PreparedStatement ps;
    private ResultSet rs;
    private String sql;

    public void inserir(Colaborador colaborador) {
        sql = "insert into colaboradores values (seqc.nextval, ?, ?, ?, ?, ?, ?)";

        try(Connection connection = Conexao.conectar()) {
            ps = connection.prepareStatement(sql);
            //ps.setLong(1, colaborador.getId_colaborador());
            ps.setString(1, colaborador.getNome());
            ps.setString(2, colaborador.getSobrenome());
            ps.setString(3, colaborador.getEmail());
            ps.setDate(4, Date.valueOf(colaborador.getDt_contratacao()));
            ps.setString(5, colaborador.getSenha());
            ps.setString(6, colaborador.getTipo_usuario());
            ps.execute();
        }

        catch(SQLException e) {
            System.out.println("erro ao inserir colaborador\n" + e);
        }
    }

}
