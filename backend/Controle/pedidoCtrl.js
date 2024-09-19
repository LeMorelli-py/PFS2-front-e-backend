import Cliente from "../Modelo/Cliente.js";
import Pedido from "../Modelo/Pedido.js";
import Console from "../Modelo/Console.js";
import ItemPedido from "../Modelo/ItemPedido.js";

export default class PedidoCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cliente = dados.cliente;
            const dataPedido = new Date(dados.dataPedido); 
            if (isNaN(dataPedido.getTime())) {
                return resposta.status(400).json({
                    "status": false,
                    "mensagem": "Data do pedido inválida"
                });
            }
            const totalPedido = dados.totalPedido;
            const itensPedido = dados.itens;
            const objCliente = new Cliente(cliente.codigo);
            const itens = itensPedido.map(item => {
                const consoleItem = new Console(item.codigo);
                return new ItemPedido(consoleItem, item.quantidade, item.precoUnitario);
            });

            const pedido = new Pedido(0, objCliente, dataPedido.toLocaleDateString(), totalPedido, itens);
            try {
                await pedido.gravar();
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Pedido incluído com sucesso!",
                    "codigo": pedido.codigo
                });
            } catch (erro) {
                console.error(erro); 
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao incluir pedido: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            const termo = requisicao.params.termo;
            if (!isNaN(termo)) {
                const pedido = new Pedido();
                try {
                    const listaPedidos = await pedido.consultar(termo);
                    resposta.status(200).json({
                        "status": true,
                        "listaPedidos": listaPedidos
                    });
                } catch (erro) {
                    console.error(erro); 
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar pedido: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código de pedido válido!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida"
            });
        }
    }
}