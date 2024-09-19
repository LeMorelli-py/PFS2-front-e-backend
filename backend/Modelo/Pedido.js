import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
    #codigo;
    #cliente;
    #data;
    #total;
    #itens;
    #pedidoDAO;

    constructor(codigo, cliente, data, total, itens) {
        this.#pedidoDAO = new PedidoDAO();
        this.#codigo = codigo; // Usando o setter para validação
        this.#cliente = cliente;
        this.#data = data;
        this.#total = total;
        this.#itens = itens;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (typeof novoCodigo !== "number" || novoCodigo >= 0) {
            throw new Error("Formato de dado inválido: o código deve ser um número positivo.");
        }
        this.#codigo = novoCodigo;
    }

    // Código do Cliente
    get cliente() {
        return this.#cliente;
    }

    set cliente(novoCliente) {
        this.#cliente = novoCliente;
    }

    // Data
    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    // Total do Pedido
    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    // Itens
    get itens() {
        return this.#itens;
    }

    set itens(novosItens) {
        this.#itens = novosItens;
    }

    // JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            cliente: this.#cliente,
            data: this.#data,
            total: this.#total,
            itens: this.#itens,
        };
    }

    async gravar() {
        this.codigo = await this.#pedidoDAO.gravar(this);
    }

    async atualizar() {
        await this.#pedidoDAO.atualizar(this);
    }

    async excluir() {
        await this.#pedidoDAO.excluir(this);
    }

    async consultar(termoBusca) {
        return await this.#pedidoDAO.consultar(termoBusca);
    }
}
