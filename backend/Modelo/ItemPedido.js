export default class ItemPedido {
    #console;
    #quantidade;
    #precoUnitario;

    constructor(console, quantidade, precoUnitario) {
        this.#console = console;
        this.quantidade = quantidade; 
        this.precoUnitario = precoUnitario; 
    }

    get console() {
        return this.#console;
    }

    set console(novoConsole) {
        this.#console = novoConsole;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        if (novaQuantidade < 0) {
            throw new Error("Quantidade não pode ser negativa.");
        }
        this.#quantidade = novaQuantidade;
    }

    get precoUnitario() {
        return this.#precoUnitario;
    }

    set precoUnitario(novoPrecoUnitario) {
        if (novoPrecoUnitario < 0) {
            throw new Error("Preço unitário não pode ser negativo.");
        }
        this.#precoUnitario = novoPrecoUnitario;
    }

    get subtotal() {
        return this.#quantidade * this.#precoUnitario;
    }

    // JSON
    toJSON() {
        return {
            console: this.#console,
            quantidade: this.#quantidade,
            precoUnitario: this.#precoUnitario,
            subtotal: this.subtotal
        };
    }
}