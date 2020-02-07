const { check, validationResult } = require('express-validator/check');
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
        }
    }
}

module.exports = LivroController;