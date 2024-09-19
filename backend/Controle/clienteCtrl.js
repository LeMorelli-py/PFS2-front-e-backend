import Cliente from "../Modelo/Cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco
            const cpf = dados.cpf

            if (nome && telefone && endereco && cpf) {
                const cliente = new Cliente(0, nome, telefone,
                    endereco, cpf
                );
                //resolver a promise
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": cliente.codigo,
                        "mensagem": "cliente incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o cliente:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, insira todos os dados do cliente segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um cliente!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const cpf = dados.cpf
            if (codigo && nome && telefone && endereco && cpf) {
                const cliente = new Cliente(codigo, nome, telefone,
                    endereco, cpf);
                //resolver a promise
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "cliente atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o cliente:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do cliente segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const cliente = new Cliente(codigo);
                //resolver a promise
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "cliente excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o cliente:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
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
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes) => {
                resposta.json(
                    {
                        status: true,
                        listaClientes
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os clientes: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar clientes!"
            });
        }
    }
}