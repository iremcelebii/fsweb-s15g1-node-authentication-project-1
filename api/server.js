const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");
const authMd = require("./auth/auth-middleware");

sessionConfig = {
  name: "cikolatacips",
  secret: "bla bla",
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
};

const server = express();
server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use("/api/auth", authRouter);
server.use("/api/users", authMd.sinirli, userRouter);
server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

/**
  Kullanıcı oturumlarını desteklemek için `express-session` paketini kullanın!
  Kullanıcıların gizliliğini ihlal etmemek için, kullanıcılar giriş yapana kadar onlara cookie göndermeyin. 
  'saveUninitialized' öğesini false yaparak bunu sağlayabilirsiniz
  ve `req.session` nesnesini, kullanıcı giriş yapana kadar değiştirmeyin.

  Kimlik doğrulaması yapan kullanıcıların sunucuda kalıcı bir oturumu ve istemci tarafında bir cookiesi olmalıdır,
  Cookienin adı "cikolatacips" olmalıdır.

  Oturum memory'de tutulabilir (Production ortamı için uygun olmaz)
  veya "connect-session-knex" gibi bir oturum deposu kullanabilirsiniz.
 */
