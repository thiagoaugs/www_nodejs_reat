const express = require('express');
const crypto = require('crypto');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/users', (request, response) => {
    const params = request.query;
    const body = request.body;
    console.log(params);
    console.log(body);

    return response.json({
        return: 'sussesaaa'
    });
});
routes.post('/ongs', async (request, response) => {
    const data = request.body;
    console.log(data);

    const {name, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await  connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,

    });


    return response.json({
      id
    });
});
module.exports = routes;