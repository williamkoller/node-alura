const BaseController = require("../controllers/baseController");
const baseController = new BaseController();
module.exports = app => {
  const rotasBase = BaseController.rotas();
  app.get(rotasBase.home, baseController.home());
  app
    .router(rotasBase.login)
    .get(baseController.login())
    .post(baseController.efetuarLogin());
};
