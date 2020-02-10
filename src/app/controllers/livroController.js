const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/lista-dao');
const db = require('../../config/database');

class LivroController {

    lista() {
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'), {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
        };
    }

    formularioCadastro() {
        return function(req, resp) {
            resp.marko(
                require('../views/livros/form/form.marko'), { livro: {} }
            );
        };
    }

    formularioEdicao() {
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro =>
                    resp.marko(
                        require('../views/livros/form/form.marko'), { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        };
    }

    cadastra() {
        return function(req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return resp.marko(
                    require('../views/livros/form/form.marko'), {
                        livro: {},
                        errosValidacao: erros.array()
                    }
                );
            }

            livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        };
    }

    edita() {
        return function(req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);

            livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        };
    }

    remove() {
        return function(req, resp) {
            const id = req.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        };
    }
}

module.exports = LivroController;