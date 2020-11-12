/*
 */

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const validator = require("express-validator");
const passport = require("passport");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);

const { database } = require("./key");

const app = express();
require("./libs/passport");

//config
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs(), {
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: require("./libs/handlebar"),
});
app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "hardwell",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//routes ---paso directamente la ruta
app.use(require("./routes/route"));
app.use(require("./routes/authentication"));
app.use("/link", require("./routes/link"));

//files statics
app.use(express.static(path.join(__dirname, "public")));

// listen the server
app.listen(app.get("port"), () =>
  console.log("server listening on port", app.get("port"))
);
