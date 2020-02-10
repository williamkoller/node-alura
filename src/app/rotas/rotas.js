const LivroController = require('../controllers/livroController');
const livroController = new LivroController();

const BaseController = require('../controllers/baseController');
const baseController = new BaseController();

const Livro = require('../modelos/livro');

module.exports = (app) => {
    const rotasBase = BaseController.rotas();
    const rotasLivro = LivroController.rotas();

    app.get(rotasBase.home, baseController.home());

    app.get(rotasLivro.lista, livroController.lista());

    app.get(rotasLivro.cadastro, livroController.formularioCadastro());

    app.get(rotasLivro.edicao, livroController.formularioEdicao());

    app.post(rotasLivro.lista, Livro.validacoes(), livroController.cadastra());

    app.put(rotasLivro.lista, livroController.edita());

    app.delete(rotasLivro.delecao, livroController.remove());
};