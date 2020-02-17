const templates = require("../views/templates");
class BaseController {
  static rotas() {
    return {
      home: "/home"
    };
  }

  home() {
    return function(req, resp) {
      resp.marko(templates.base.home);
    };
  }
}

module.exports = BaseController;
