/*
 */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../db");
const helper = require("./helper");

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      /* console.log(req.body); */
      const { name, lastname, email } = req.body;
      const newUser = {
        name,
        lastname,
        username,
        password,
        email,
      };

      const query = await helper.encryptPassword(password);
      newUser.password = query;

      const result = await pool.query("insert into users set ? ", newUser);
      /* console.log(result); */
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const row = await pool.query("select * from users where id_user = ?", id);
  /* console.log(row); */
  done(null, row[0]);
});
