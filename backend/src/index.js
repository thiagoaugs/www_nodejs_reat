const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
/**
 * Tipos de parametros
 * 
 * query params:  Parametros nomeados enviados na rota apos "?" (filtros, paginacao)
 * route params: Parametros utilizados para identificar recursos
 * request body: Corpo da requisicao, utilizado para criar ou alterar recursos
 */

/**
 * Driver: SELECT * FROM users
 * query builder: table('user)
 */




app.listen(3333);

