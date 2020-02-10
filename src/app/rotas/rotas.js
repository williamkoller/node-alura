const LivroController = require('../controllers/livroController');
const livroController = new LivroController();

const BaseController = require('../controllers/baseController');
const baseController = new BaseController();

const { check } = require('express-validator/check');

module.exports = (app) => {
    app.get('/', baseController.home());

    app.get('/livros', livroController.lista());

    app.get('/livros/form', livroController.formularioCadastro());

    app.get('/livros/form/:id', livroController.formularioEdicao());

    app.post('/livros', [
            check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
            check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
        ],
        livroController.cadastra());

    app.put('/livros', livroController.edita());

    app.delete('/livros/:id', livroController.remove());
};