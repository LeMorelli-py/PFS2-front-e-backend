import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../../busca/CaixaSelecao';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { alterar, gravar } from '../../../servicos/consoleService';

export default function FormCadconsole(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [marcaSelecionada, setMarcaSelecionada] = useState(props.consoleSelecionado.marca);
    const [console, setConsole] = useState(props.consoleSelecionado);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento) {
        setConsole({
            ...console,
            [evento.target.name]: evento.target.value
        });
    }

    async function manipularSubmissao(evento) {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        setValidado(!formulario.checkValidity());

        if (formulario.checkValidity()) {
            const token = contextoUsuario.usuarioLogado.token;
            const dados = { ...console, marca: marcaSelecionada };

            try {
                if (!props.modoEdicao) {
                    const resposta = await gravar(dados, token);
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);
                    }
                } else {
                    const resposta = await alterar(dados, token);
                    alert(resposta.mensagem);
                    props.setModoEdicao(false);
                    setConsole({
                        cons_codigo: 0,
                        cons_descricao: "",
                        cons_precoCusto: 0,
                        cons_precoVenda: 0,
                        marca: {
                            mar_codigo: 0,
                            mar_descricao: ""
                        },
                        cons_qtdEstoque: 0,
                    });
                    props.setConsoleSelecionado({
                        cons_codigo: 0,
                        cons_descricao: "",
                        cons_precoCusto: 0,
                        cons_precoVenda: 0,
                        marca: {
                            mar_codigo: 0,
                            mar_descricao: ""
                        },
                        cons_qtdEstoque: 0,
                    });
                }
            } catch (erro) {
                alert("Erro ao enviar a requisição: " + erro.message);
            }
        }

        evento.stopPropagation();
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cons_codigo"
                        name="codigo"
                        value={console.cons_codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do console!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cons_descricao"
                        name="descricao"
                        value={console.cons_descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do console!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="cons_precoCusto">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="cons_precoCusto"
                            name="precoCusto"
                            aria-describedby="precoCusto"
                            onChange={manipularMudanca}
                            value={console.cons_precoCusto}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de custo!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="cons_precoVenda">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="cons_precoVenda"
                            name="precoVenda"
                            aria-describedby="precoVenda"
                            onChange={manipularMudanca}
                            value={console.cons_precoVenda}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de venda!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Qtd em estoque:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="cons_qtdEstoque">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="cons_qtdEstoque"
                            name="qtdEstoque"
                            aria-describedby="qtdEstoque"
                            onChange={manipularMudanca}
                            value={console.cons_qtdEstoque}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a quantidade em estoque!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Col md={8}>
                    <Form.Label>Categoria:</Form.Label>
                    <CaixaSelecao
                        enderecoFonteDados={"http://localhost:4000/marca"}
                        campoChave={"cons_codigo"}
                        campoExibicao={"cons_descricao"}
                        funcaoSelecao={setMarcaSelecionada}
                        localLista={"listaCMarcas"}
                        tokenAcesso={contextoUsuario.usuarioLogado.token}
                    />
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}