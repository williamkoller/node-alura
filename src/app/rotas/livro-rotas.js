const LivroController = require("../controllers/livroController");
const livroController = new LivroController();
const Livro = require("../modelos/livro");
const BaseController = require("../controllers/baseController");

module.exports = app => {
  const rotasLivro = LivroController.rotas();

  app.use(rotasLivro.autenticadas, function(req, resp, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      resp.redirect(BaseController.rotas().login);
    }
  });
  app.get(rotasLivro.lista, livroController.lista());

  app
    .route(rotasLivro.cadastro)
    .get(livroController.formularioCadastro())
    .post(Livro.validacoes(), livroController.cadastra())
    .put(livroController.edita());

  app.get(rotasLivro.edicao, livroController.formularioEdicao());

  app.delete(rotasLivro.delecao, livroController.remove());
};
