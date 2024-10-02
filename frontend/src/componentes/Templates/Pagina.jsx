import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Switch GAMES" />
                <Menu />
                {
                    props.children
                }
               
            </Container>
        </>

    );
}