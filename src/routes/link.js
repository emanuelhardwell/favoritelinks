/*
 */
const express = require("express");
const router = express.Router();

//requiero mi objeto que contiene la conexión a mi DB
const pool = require("../db");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  /* console.log(req.body); */
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("insert into links set ?", [newLink]);
  res.send("data save");
});

module.exports = router;
