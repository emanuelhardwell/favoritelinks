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

const app = express();

//config
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs, {
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: require("./lib/handlebars"),
});
app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//global variables
app.use((req, res, next) => {
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
