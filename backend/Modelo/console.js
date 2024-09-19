import ConsoleDAO from "../Persistencia/consoleDAO.js";
import Marca from "./marca.js";

export default class Console{
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #qtdEstoque;
    #marca;


    constructor(codigo=0,descricao="", precoCusto=0, 
                precoVenda=0, qtdEstoque=0, marca=0
                ){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#marca=marca;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao=novaDesc;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    
    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }
    get marca(){
        return this.#marca;
    }

    set marca(novaMarca){
        if (novaMarca instanceof Marca)
            this.#marca = novaMarca;
    }


    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            qtdEstoque:this.#qtdEstoque,
            marca:this.#marca
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const consDAO = new ConsoleDAO();
        await consDAO.gravar(this);
     }
 
     async excluir(){
        const consDAO = new ConsoleDAO();
        await consDAO.excluir(this);
     }
 
     async atualizar(){
        const consDAO = new ConsoleDAO();
        await consDAO.atualizar(this);
     }
 
     async consultar(termo){
        const consDAO = new ConsoleDAO();
        return await consDAO.consultar(termo);
     }

}