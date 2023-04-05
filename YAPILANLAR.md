1. npm i
2. npm i express-session -->session:bir kullanıcının bilgileri doğrulandıktan sonra oluşturulan oturum kaydı
3. const session=require("express-session") --> server.js'de import et
4. sessionConfig objesini oluştur
   sessionConfig = {
   name: "cikolatacips",
   secret: "bla bla",
   cookie: {
   maxAge: 1000 \* 30,
   secure: false,
   },
   httpOnly: true,
   resave: false,
   saveUninitialized: false,
   };
5. server.use(session(sessionConfig)) --> express.json()'dan sonra yaz
6. yeni bir kullanıcı ekleyeceğiz. user-model.js de fonksiyonu yazalım
   create fonsiyonunu yazmadan önce genelde getbyid fonksiyonunu da yazarız

   async function idyeGoreBul(user_id) {
   const user = await db("users")
   .select("user_id", "username")
   .where("user_id", user_id)
   .first();
   return user;}

   async function ekle(user) {
   const [id] = await db("users").insert(user);
   const newUser = await idyeGoreBul(id);
   return newUser;}

7. yeni kullanıcı bilgileri nereden gelecek? auth/register end pointinden
   router.post("/register", async (req, res, next) => {
   try {
   const newUser = await userModel.ekle(req.body);
   res.status(201).json(newUser);
   } catch (err) {
   next(err);
   }});

8. server.js de router'ı bağlayalım
   server.use("/api/auth", authRouter);

9. oluşturduğumuz end pointin md lerini yazalım

10. parolayı kriptolamamız gerek. Naıl yapacağız?
    ilk nerede parolayı alıyoruz?
    auth-router da register end pointinde
    const bcryptjs = require("bcryptjs"); -->import ettik
