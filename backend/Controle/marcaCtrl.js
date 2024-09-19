//camada de interface da API que traduz HTTP
import Marca from "../Modelo/marca.js";

export default class MarcaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const marca = new Marca(0, descricao);
                //resolver a promise
                marca.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": marca.codigo,
                        "mensagem": "Marca incluída com sucesso!"
                    });
                })
                    .catch((erro) => {  
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a Marca:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição da Marca!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma Marca!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const marca = new Marca(codigo, descricao);
                //resolver a promise
                marca.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Marca atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a Marca:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição da Marca!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma Marca!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const marca = new Marca(codigo);
                marca.possuiProdutos(resposta =>{
                    if(resposta == false){
                        marca.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Marca excluída com sucesso!"
                            });
                        })
                        
                        .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Erro ao excluir a Marca:" + erro.message
                                });
                        });
                    }
                    else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Essa Marca possui produtos e não pode ser excluída!"
                    });
                        }  
                    }                    
                );
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da Marca!"
                });
                }           
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma Marca!"
            });
        }
        
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const marca = new Marca();
            marca.consultar(termo).then((listaMarcas)=>{
                resposta.json(
                    {
                        status:true,
                        listaMarcas
                    });
            })
                .catch((erro)=>{
                    resposta.json(
                        {
                            status:false,
                            mensagem:"Não foi possível obter as Marcas: " + erro.message
                        }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Marcas!"
            });
        }
    }
}