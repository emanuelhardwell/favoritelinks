/*
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

router.get("/profile", (req, res) => {
  res.send("you profilr is this");
});

module.exports = router;
