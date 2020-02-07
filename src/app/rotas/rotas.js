const LivroController = require('../controllers/livroController');
const livroController = new LivroController();


module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });

    app.get('/livros', livroController.lista());

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'), { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    });

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ], function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return resp.marko(require('../views/livros/form/form.marko'), {
                livro: {},
                errosValidacao: erros.array()

            });
        }
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
};