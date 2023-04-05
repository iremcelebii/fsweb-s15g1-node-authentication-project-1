1.  npm i

2.  yeni bir kullanıcı ekleyeceğiz. user-model.js de fonksiyonu yazalım
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

3.  yeni kullanıcı bilgileri nereden gelecek? auth/register end pointinden
    router.post("/register", async (req, res, next) => {
    try {
    const newUser = await userModel.ekle(req.body);
    res.status(201).json(newUser);
    } catch (err) {
    next(err);
    }});

4.  server.js de router'ı bağlayalım
    server.use("/api/auth", authRouter);

5.  oluşturduğumuz end pointin md lerini yazalım

6.  parolayı kriptolamamız gerek. Naıl yapacağız?
    ilk nerede parolayı alıyoruz?
    auth-router da register end pointinde
    const bcryptjs = require("bcryptjs"); -->import ettik
    router.post(
    "/register",
    authMd.sifreGecerlimi,
    authMd.usernameBostami,
    async (req, res, next) => {
    try {
    const hashedPassword = bcryptjs.hashSync(req.body.password, 12);
    const newUser = await userModel.ekle({
    username: req.body.username,
    password: hashedPassword,});
    res.status(201).json(newUser);
    } catch (err) {
    next(err);
    }});

7.  register end pointi bitti /api/auth/login 'e geçelim

8.  önce isim veritabanında kayıtlı mı diye baktık

9.  daha sonra şifre doğru mu diye baktık compareSync metoduyla

10. şimdi giriş yapılmış mı diye bakacağız

11. npm i express-session -->session:bir kullanıcının bilgileri doğrulandıktan sonra oluşturulan oturum kaydı
12. const session=require("express-session") --> server.js'de import et
13. sessionConfig objesini oluştur
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
14. server.use(session(sessionConfig)) --> express.json()'dan sonra yaz
    login olduğum yerde (authRouter) req.session objesine giriş yapan kişinin idsini ekleyelim:

        const user = await userModel.nameeGoreBul(req.body.username);
        req.session.user_id = user.user_id;

    authMd de giriş yapılı durumda mı kontrol etmeliyim:

    async function sinirli(req, res, next) {
    try {
    if (req.session && req.session.user_id) {
    // console.log(req.session);
    // console.log(req.session.user_id);
    next();
    } else {
    next({status: 401,message: "Geçemezsiniz!",});}
    } catch (error) {
    next(error);}}

    bu md den geçmiyorsa users daki hiçbir işlemi yapamamalı o yüzden server.js de usersrouter ın önüne yazıyorum bu md yi
