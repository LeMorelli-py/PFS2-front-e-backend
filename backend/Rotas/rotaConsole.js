import { Router } from "express";
import consoleCtrl from "../Controle/consoleCtrl.js";

const consCtrl = new consoleCtrl();
const rotaConsole = new Router();

rotaConsole
.get('/', consCtrl.consultar)
.get('/:termo', consCtrl.consultar)
.post('/', consCtrl.gravar)
.patch('/', consCtrl.atualizar)
.put('/', consCtrl.atualizar)
.delete('/', consCtrl.excluir);

export default rotaConsole;