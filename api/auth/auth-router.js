//!router.js adımlar:
/*
    1. express'i import et --> const express = require("express");
    2.express'ten Router'ı import et --> const router = express.Router();
    3.end pointlerini yazmaya hazırsın
      3.1.end pointlerde try catch blopu oluştur
      3.2. async fonksiyon olduğunu unutma
      3.3.url de bir şey varsa params ile al
      3.4. body de bir şey gönderiyorsan bodyden onu al
      3.5. res.json da gönder
    4.middleware.js'i import et (yazınca)
*/
const userModel = require("../users/users-model");
const authMd = require("./auth-middleware");
const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();

router.post(
  "/register",
  authMd.sifreGecerlimi,
  authMd.usernameBostami,
  async (req, res, next) => {
    try {
      const hashedPassword = bcryptjs.hashSync(req.body.password, 12);
      const newUser = await userModel.ekle({
        username: req.body.username,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  authMd.usernameVarmi,
  authMd.sifreDogruMu,
  async (req, res, next) => {
    try {
      const user = await userModel.nameeGoreBul(req.body.username);
      req.session.user_id = user.user_id;
      res.status(200).json({ message: `Hoşgeldin ${req.body.username}!` });
    } catch (err) {
      next(err);
    }
  }
);

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status: 200
  {
    "message": "Hoşgeldin sue!"
  }

  response geçersiz kriter:
  status: 401
  {
    "message": "Geçersiz kriter!"
  }
 */

/**
  3 [GET] /api/auth/logout

  response giriş yapmış kullanıcılar için:
  status: 200
  {
    "message": "Çıkış yapildi"
  }

  response giriş yapmamış kullanıcılar için:
  status: 200
  {
    "message": "Oturum bulunamadı!"
  }
 */

module.exports = router;

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status: 201
  {
    "user_id": 2,
    "username": "sue"
  }

  response username alınmış:
  status: 422
  {
    "message": "Username kullaniliyor"
  }

  response şifre 3 ya da daha az karakterli:
  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
 */
