import { Alert } from "react-bootstrap";
import FormCadConsole from "./Formularios/FormCadConsole";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaDeConsoles from "./Tabelas/TabelaConsoles";
import { consultarTodos } from "../../servicos/consoleService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroProduto(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [consoleSelecionado, setConsoleSelecionado] = useState({
        cons_codigo: 0,
        cons_descricao: "",
        cons_precoCusto: 0,
        cons_precoVenda: 0,
        marca: {
            mar_codigo: 0,
            mar_descricao: ""
        },
        urlImagem: "",
        qtdEstoque: 0,
        dataValidade: "",
    });
    const [listaDeConsoles, setListaDeConsoles] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            setListaDeConsoles(resposta.listaConsoles);
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela, contextoUsuario.usuarioLogado.token]);
   
    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 success text-center" variant="success">
                    <h2>
                        Cadastro de Produtos
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaDeConsoles
                            listaDeConsoles={listaDeConsoles} 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setConsoleSelecionado={setConsoleSelecionado} 
                            setAtualizarTela={setAtualizarTela} 
                        /> :
                        <FormCadConsole
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            modoEdicao={modoEdicao}
                            consoleSelecionado={consoleSelecionado}
                            setAtualizarTela={setAtualizarTela} 
                        />
                }
            </Pagina>
        </div>
    );
}