const express = require("express");
const router = express.Router();
const BaseController = require("../controllers/baseController");
const baseController = new BaseController();
module.exports = router => {
  const rotasBase = BaseController.rotas();
  router.get(rotasBase.home, baseController.home());
  router.get(rotasBase.login);
  router.get(baseController.login());
  router.post(baseController.efetuarLogin());
};
