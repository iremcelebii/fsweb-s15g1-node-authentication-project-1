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

const express = require("express");
const router = express.Router();
const userModel = require("./users-model");

router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.bul();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
/**
  [GET] /api/users

  Bu uç nokta SINIRLIDIR: sadece kullanıcı girişi yapmış kullanıcılar
  ulaşabilir.

  response:
  status: 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response giriş yapılamadıysa:
  status: 401
  {
    "message": "Geçemezsiniz!"
  }
 */

// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.
