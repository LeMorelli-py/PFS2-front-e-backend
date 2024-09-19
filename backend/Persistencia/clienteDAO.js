import Cliente from "../Modelo/Cliente.js";
import conectar from "../Persistencia/conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class ClienteDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    cli_codigo INT NOT NULL AUTO_INCREMENT,
                    cli_nome VARCHAR(100) NOT NULL,
                    cli_telefone VARCHAR(14),
                    cli_endereco VARCHAR(100),
                    cli_cpf VARCHAR(14) UNIQUE,
                    CONSTRAINT pk_marca PRIMARY KEY(cli_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const sql = "INSERT INTO cliente(cli_nome, cli_telefone, cli_endereco, cli_cpf) VALUES(?,?,?,?)"; 
            const parametros = [cliente.nome, cliente.telefone, cliente.endereco, cliente.cpf];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            cliente.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }


    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const sql = "UPDATE cliente SET cli_nome = ?, cli_telefone = ?, cli_endereco = ?, cli_cpf = ? WHERE cli_codigo = ?"; 
            const parametros = [cliente.nome, cliente.telefone, cliente.endereco, cliente.cpf, cliente.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            // excluir uma categoria implica em excluir antes todos os seus produtos
            // para nao violar a integridade referencial do banco de dados
            // a restrição deve ser implementada na camada de Controle
            const sql = "DELETE FROM cliente WHERE cli_codigo = ?"; 
            const parametros = [cliente.codigo];
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
            sql='SELECT * FROM cliente WHERE cli_cpf = ? order by cli_cpf';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM cliente WHERE cli_telefone like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(registro.cli_codigo,
                registro.cli_nome, registro.cli_telefone,
                registro.cli_endereco, registro.cli_cpf);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

   
}