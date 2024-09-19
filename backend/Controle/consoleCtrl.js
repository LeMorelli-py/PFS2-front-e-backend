import Console from "../Modelo/console.js";
import Marca from "../Modelo/marca.js";

export default class ConsoleCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const qtdEstoque = dados.qtdEstoque;
            const mar_codigo = dados.mar_codigo;

            if (descricao && precoCusto > 0 && precoVenda > 0 
                && qtdEstoque >= 0 && mar_codigo > 0) {
                const marca = new Marca(mar_codigo);
                const console = new Console(0, descricao, precoCusto,
                    precoVenda, qtdEstoque, marca
                );
                //resolver a promise
                console.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": console.codigo,
                        "mensagem": "console incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o console:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do console segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um console!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const qtdEstoque = dados.qtdEstoque;
            const mar_codigo = dados.mar_codigo;
            if (codigo && descricao && precoCusto > 0 && precoVenda > 0 
                && qtdEstoque >= 0 && mar_codigo > 0) {
                const marca = new Marca(mar_codigo);
                const console = new Console(codigo, descricao, precoCusto,
                    precoVenda,  qtdEstoque, marca);
                //resolver a promise
                console.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "console atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o console:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do console segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um Console!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const console = new Console(codigo);
                //resolver a promise
                console.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "console excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o console:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do console!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um console!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const console = new Console();
            console.consultar(termo).then((listaconsoles) => {
                resposta.json(
                    {
                        status: true,
                        listaconsoles
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os consoles: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar consoles!"
            });
        }
    }
}