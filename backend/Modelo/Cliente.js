import ClienteDAO from "../Persistencia/clienteDAO.js";
export default class Cliente {
    #codigo;
    #nome;
    #telefone;
    #endereco;
    #cpf;

    constructor(codigo, nome, telefone, endereco, cpf) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#cpf = cpf;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome === "") {
            console.log("Dado não preenchido");
        } else {
            this.#nome = novoNome;
        }
    }

    // Telefone
    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if (novoTelefone === "" || novoTelefone.length !== 14) {
            console.log("Formato de telefone inválido");
        } else {
            this.#telefone = novoTelefone;
        }
    }

    // Endereço
    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if (novoEndereco === "") {
            console.log("Dado não preenchido");
        } else {
            this.#endereco = novoEndereco;
        }
    }

       // CPF
       get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        if (novoCpf === "") {
            console.log("Dado não preenchido");
        } else {
            this.#cpf = novoCpf;
        }
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'nome': this.#nome,
            'telefone': this.#telefone,
            'endereco': this.#endereco,
            'cpf': this.#cpf
        };
    }

    async gravar() {
        const clienteDAO = new ClienteDAO();
        this.codigo = await clienteDAO.gravar(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        const listaClientes = await clienteDAO.consultar(termo);
        return listaClientes;
    }

}