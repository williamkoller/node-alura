const LivroController = require('../controllers/livroController');
const livroController = new LivroController();


module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.redirect('http://localhost:3000/livros' + req.url)
    });

    app.get('/', livroController.index());

    app.get('/livros', livroController.lista());

    app.get('/livros/form', livroController.formulario());

    app.get('/livros/form/:id', livroController.editar());

    app.post('/livros', livroController.adicionar());

    app.put('/livros', livroController.atualizar());

    app.delete('/livros/:id', livroController.remove());
};