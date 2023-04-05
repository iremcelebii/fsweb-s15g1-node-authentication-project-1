const db = require("../../data/db-config");

function bul() {
  return db("users").select("user_id", "username");
}

function goreBul(filtre) {
  return db("users").select("user_id", "username").where(filtre);
}

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

async function nameeGoreSıfreBul(username) {
  const user = await db("users")
    .select("username", "password")
    .where("username", username)
    .first();

  return user;
}

async function ekle(user) {
  const [id] = await db("users").insert(user);
  const newUser = await idyeGoreBul(id);
  return newUser;
}

module.exports = {
  bul,
  goreBul,
  idyeGoreBul,
  nameeGoreBul,
  nameeGoreSıfreBul,
  ekle,
};
