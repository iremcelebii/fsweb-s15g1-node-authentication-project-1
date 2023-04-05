const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");
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

async function usernameVarmi(req, res, next) {
  try {
    const user = await userModel.nameeGoreBul(req.body.username);
    if (user) {
      next();
    } else {
      res.status(401).json({ message: "Geçersiz kriter" });
    }
  } catch (err) {
    next(err);
  }
}

async function sifreDogruMu(req, res, next) {
  try {
    const sifreVeUser = await userModel.nameeGoreSıfreBul(req.body.username);
    // console.log(dbdekiSifre); SADECE ŞİFRE GELMİYORMUŞ BURADAN
    if (bcryptjs.compareSync(req.body.password, sifreVeUser.password)) {
      next();
    } else {
      res.status(401).json({ message: "Geçersiz kriter!" }); //yanlış şifre
    }
  } catch (err) {
    next(err);
  }
}

async function sinirli(req, res, next) {
  try {
    if (req.session && req.session.user_id) {
      console.log(req.session);
      console.log(req.session.user_id);
      next();
    } else {
      next({
        status: 401,
        message: "Geçemezsiniz!",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  usernameBostami,
  sifreGecerlimi,
  usernameVarmi,
  sifreDogruMu,
  sinirli,
};

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
