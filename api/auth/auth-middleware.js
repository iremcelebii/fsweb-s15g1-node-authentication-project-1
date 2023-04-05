const userModel = require("../users/users-model");

/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
function sinirli() {}

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/
async function usernameBostami(req, res, next) {
  try {
    const user = await userModel.nameeGoreBul(req.body.username);
    if (!user) {
      next();
    } else {
      res.status(422).json({ message: "Username kullaniliyor" });
    }
  } catch (err) {
    next(err);
  }
}

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
function usernameVarmi() {}

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/
async function sifreGecerlimi(req, res, next) {
  try {
    const password = req.body.password;
    if (password > 3) {
      next();
    } else {
      res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { usernameBostami, sifreGecerlimi };
