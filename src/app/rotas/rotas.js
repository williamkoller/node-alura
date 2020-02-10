const livroRotas = require('../rotas/livro-rotas');
const baseRotas = require('../rotas/base-rotas');

module.exports = (app) => {
    baseRotas(app);
    livroRotas(app);
};