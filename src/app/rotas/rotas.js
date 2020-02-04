const LivroDao = require('../infra/lista-dao');
const db = require('../../config/database');
module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Nodejs with express</title>
  </head>
  <body>
    <h1>Nodejs with express</h1>
  </body>
  </html>`
        );
    });

    app.get('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.lista().then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'), {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(
            require('../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });


};