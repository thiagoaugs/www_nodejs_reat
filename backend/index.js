const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({return: 'sucesso'});
});


app.listen(3333);

