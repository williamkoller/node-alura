class UsuarioDao {
  constructor(db) {
    this._db = db;
  }

  buscaPorEmail(email) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
          SELECT * FROM usuarios WHERE email = ?
          `,
        [email],
        (erro, email) => {
          if (erro) return reject("Não foi possível buscar o e-mail");

          return resolve(email);
        }
      );
    });
  }
}

module.exports = UsuarioDao;
