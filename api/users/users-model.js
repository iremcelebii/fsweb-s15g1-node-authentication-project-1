const db = require("../../data/db-config");

/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
function bul() {}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
function goreBul(filtre) {}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
async function idyeGoreBul(user_id) {
  const user = await db("users")
    .select("user_id", "username")
    .where("user_id", user_id)
    .first();

  return user;
}

async function nameeGoreBul(username) {
  const user = await db("users")
    .select("user_id", "username")
    .where("username", username)
    .first();

  return user;
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
async function ekle(user) {
  const [id] = await db("users").insert(user);
  const newUser = await idyeGoreBul(id);
  return newUser;
}

module.exports = { bul, goreBul, idyeGoreBul, nameeGoreBul, ekle };
