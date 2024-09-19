import Pedido from "../Modelo/Pedido.js";
import Cliente from "../Modelo/Cliente.js";
import Marca from "../Modelo/Marca.js"; // Corrigido para "Marca"
import Console from "../Modelo/Console.js"; // Corrigido para "Console"
import ItemPedido from "../Modelo/ItemPedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar(pedido) {
        if (pedido instanceof Pedido) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = `INSERT INTO pedido(cli_codigo, data_pedido, total) VALUES(?, str_to_date(?, "%d/%m/%y"), ?)`;
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.total];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertId; 

                const sql2 = `INSERT INTO item_pedido(pedido_codigo, cons_codigo, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`;
                for (const item of pedido.itens) {
                    const parametros2 = [pedido.codigo, item.console.codigo, item.quantidade, item.console.precoUnitario];
                    await conexao.execute(sql2, parametros2);
                }

                await conexao.commit();
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            } finally {
                global.poolConexoes.releaseConnection(conexao);
            }  
        }
    }

    async alterar(pedido) {
    }

    async excluir(pedido) {
    }

    async consultar(termoBusca) {
        const listaPedidos = [];
        const conexao = await conectar();

        try {
            let sql;
            let parametros;

            if (!isNaN(termoBusca)) {
                sql = `SELECT p.codigo, p.cli_codigo, DATE(p.data_pedido) as data, p.total, 
                        cli.cli_nome, cli.cli_telefone, cli.cli_endereco, cli.cli_cpf, 
                        cons.cons_codigo, cons.cons_descricao, cons.cons_precoCusto, cons.cons_precoVenda, cons.cons_qtdEstoque,
                        mar.mar_codigo, mar.mar_descricao, 
                        ip.cons_codigo, ip.quantidade, ip.preco_unitario, (ip.quantidade * ip.preco_unitario) as subtotal
                        FROM pedido as p
                        INNER JOIN cliente cli ON p.cli_codigo = cli.cli_codigo   
                        INNER JOIN item_pedido ip ON ip.pedido_codigo = p.codigo
                        INNER JOIN console cons ON cons.cons_codigo = ip.cons_codigo
                        INNER JOIN marca mar ON mar.mar_codigo = cons.mar_codigo
                        WHERE p.codigo = ?`;
                parametros = [termoBusca];
            } else {
                sql = `SELECT 
                            p.codigo, p.cli_codigo, DATE(p.data_pedido) as data, p.total,
                            cli.cli_nome, cli.cli_telefone, cli.cli_endereco, cli.cli_cpf,
                            cons.cons_codigo, cons.cons_descricao, cons.cons_precoCusto, cons.cons_precoVenda, cons.cons_qtdEstoque,
                            mar.mar_codigo, mar.mar_descricao, 
                            ip.cons_codigo, ip.quantidade, ip.preco_unitario, (ip.quantidade * ip.preco_unitario) as subtotal
                        FROM pedido as p
                        INNER JOIN cliente cli ON p.cli_codigo = cli.cli_codigo
                        INNER JOIN item_pedido ip ON ip.pedido_codigo = p.codigo
                        INNER JOIN console cons ON cons.cons_codigo = ip.cons_codigo
                        INNER JOIN marca mar ON mar.mar_codigo = cons.mar_codigo
                        WHERE cli.cli_nome like ?`;
                parametros = [termoBusca];
            }

            const [registros] = await conexao.execute(sql, parametros);

            if (registros.length > 0) {
                const cliente = new Cliente(registros[0].cli_codigo, registros[0].cli_nome, registros[0].cli_telefone, registros[0].cli_endereco, registros[0].cli_cpf);
                let listaItensPedido = [];
                for (const registro of registros) { 
                    const marca = new Marca(registro.mar_codigo, registro.mar_descricao);
                    const console = new Console(registro.cons_codigo, registro.cons_descricao,  registro.cons_precoCusto, registro.cons_precoVenda, registro.cons_qtdEstoque, registro.mar_descricao , marca);
                    const itemPedido = new ItemPedido(console, registro.quantidade, registro.preco_unitario, registro.subtotal);
                    listaItensPedido.push(itemPedido);
                }
                const pedido = new Pedido(registros[0].codigo, cliente, registros[0].data_pedido, registros[0].total, listaItensPedido);
                listaPedidos.push(pedido);
            }
        } catch (erro) {
            throw erro;  // Adicione tratamento de erro adequado
        } finally {
            global.poolConexoes.releaseConnection(conexao);
        }

        return listaPedidos;
    }
}