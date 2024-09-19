import Marca from "../Modelo/marca.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class MarcaDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS marca(
                    mar_codigo INT NOT NULL AUTO_INCREMENT,
                    mar_descricao VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_marca PRIMARY KEY(mar_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(marca){
        if (marca instanceof Marca){
            const sql = "INSERT INTO marca(mar_descricao) VALUES(?)"; 
            const parametros = [marca.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            marca.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(marca){
        if (marca instanceof Marca){
            const sql = "UPDATE marca SET mar_descricao = ? WHERE mar_codigo = ?"; 
            const parametros = [marca.descricao, marca.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(marca){
        if (marca instanceof Marca){
            // excluir uma categoria implica em excluir antes todos os seus produtos
            // para nao violar a integridade referencial do banco de dados
            // a restrição deve ser implementada na camada de Controle
            const sql = "DELETE FROM marca WHERE mar_codigo = ?"; 
            const parametros = [marca.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da marca
            sql='SELECT * FROM marca WHERE mar_codigo = ? order by mar_descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM marca WHERE mar_descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listamarcas = [];
        for (const registro of registros){
            const marca = new Marca(registro.mar_codigo,registro.mar_descricao);
            listamarcas.push(marca);
        }
        return listamarcas;
    }

    async possuiProdutos(marca){
        if (marca instanceof Marca){
            const sql = `SELECT count(*) as qtd FROM console c
                         INNER JOIN marca m ON c.mar_codigo = m.mar_codigo
                         WHERE c.mar_codigo = ?`;
            const parametros = [marca.codigo];
            const [registros, campos] = await global.poolConexoes.execute(sql,parametros);
            return registros[0].qtd > 0;
};
    }
}