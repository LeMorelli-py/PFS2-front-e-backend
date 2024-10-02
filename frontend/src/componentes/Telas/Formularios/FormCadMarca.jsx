import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../../App';
import { gravar, alterar } from '../../../servicos/marcaService';

export default function FormCadMarcas(props) {
    const [marca, setMarca] = useState(props.marcaSelecionada);
    const [validado, setValidado] = useState(false);
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function manipularMudanca(evento) {
        setMarca({
            ...marca,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                gravar(marca,token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
            else {
                alterar(marca, token).then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setMarcaSelecionada( { mar_codigo: 0, mar_descricao: "" });

                    setValidado(false);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }

        }
        else{
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="mar_codigo"
                                    name="codigo"
                                    onChange={manipularMudanca}
                                    value={marca.mar_codigo}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código da marca</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição da marca"
                                    id="mar_descricao"
                                    name="descricao"
                                    onChange={manipularMudanca}
                                    value={marca.mar_descricao}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da marca!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}