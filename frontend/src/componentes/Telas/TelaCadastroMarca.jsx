import { Alert } from "react-bootstrap";
import FormCadMarcas from "./Formularios/FormCadMarca";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaMarcas from "./Tabelas/TabelaMarcas";
import { consultarTodos } from "../../servicos/marcaService";
import { ContextoUsuarioLogado } from "../../App";
export default function TelaCadastroMarca(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [marcaSelecionada, setMarcaSelecionada] = useState({ mar_codigo: 0, mar_descricao: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeMarcas, setListaDeMarcas] = useState([]);
    
    useEffect(() => {
        consultarTodos(contextoUsuario.usuarioLogado.token).then((resposta) => {
            if (resposta.status){
                setListaDeMarcas(resposta.listaMarcas);
            }
            else{
                alert(resposta.mensagem);
            }
        })
    }, [listaDeMarcas]);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Marcas
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaMarcas listaDeMarcas={listaDeMarcas} 
                                          setExibirTabela={setExibirTabela} 
                                          marcaSelecionada={marcaSelecionada}
                                          setMarcaSelecionada={setMarcaSelecionada}
                                          setModoEdicao={setModoEdicao}/> :
                        <FormCadMarcas    setExibirTabela={setExibirTabela}
                                           marcaSelecionada={marcaSelecionada}
                                           setMarcaSelecionada={setMarcaSelecionada}
                                           setModoEdicao={setModoEdicao} 
                                           modoEdicao={modoEdicao}/>
                }
            </Pagina>
        </div>
    );
}