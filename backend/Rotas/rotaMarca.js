import { Router } from "express";
import MarcaCtrl from "../Controle/marcaCtrl.js";
//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const marCtrl = new MarcaCtrl();
const rotaMarca = new Router();

rotaMarca
.get('/',marCtrl.consultar)
.get('/:termo', marCtrl.consultar)
.post('/',marCtrl.gravar)
.patch('/',marCtrl.atualizar)
.put('/',marCtrl.atualizar)
.delete('/',marCtrl.excluir);

export default rotaMarca;