class UsuarioDao {
  constructor(db) {
    this._db = db;
  }

  buscaPorEmail(email) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
          SELECT * FROM usuarios WHERE email = ?
          `,
        [email],
        (erro, usuario) => {
          if (erro) return reject("Não foi possível buscar o e-mail");

          return resolve(usuario);
        }
      );
    });
  }
}

module.exports = UsuarioDao;
