/*
 */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../db");
const helper = require("./helper");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      /* console.log(req.body); */
      const row = await pool.query("select * from users where username = ? ", [
        username,
      ]);

      if (row.length > 0) {
        const user = row[0];
        const query = await helper.matchPassword(password, user.password);
        if (query) {
          done(
            null,
            user,
            req.flash("success", "Welcome Sr. " + user.username)
          );
        } else {
          done(null, false, req.flash("message", "Incorrect Password !!!"));
        }
      } else {
        done(null, false, req.flash("message", "Username not found !!!"));
      }
    }
  )
);

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
      let newUser = {
        name,
        lastname,
        username,
        password,
        email,
      };

   
      newUser.password = await helper.encryptPassword(password);

      const result = await pool.query("insert into users set ? ", newUser);
      /* console.log(result); */
      newUser.id = result.insertId;
      console.log(newUser.id);
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  /* const row = await pool.query("select * from users where id_user = ?", [user.id]); */
  /* console.log(row); */
  /* done(null, row[0]); */
  done(null, user);
});
