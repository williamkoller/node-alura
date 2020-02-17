const templates = require("../views/templates");
class BaseController {
  static rotas() {
    return {
      home: "/home",
      login: "/login"
    };
  }
  home() {
    return function(req, resp) {
      resp.marko(templates.base.home);
    };
  }
  login() {
    return function(req, resp) {
      resp.marko(templates.base.login);
    };
  }
  efetuarLogin() {
    return function(req, resp) {};
  }
}
module.exports = BaseController;
