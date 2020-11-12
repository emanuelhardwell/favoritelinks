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
  res.redirect("/link");
});

/* listar mis link */
router.get("/", async (req, res) => {
  const links = await pool.query("select * from links");
  res.render("links/list", { links });
});

router.get("/delete/:id_link", async (req, res) => {
  const id = req.params.id_link;
  pool.query("delete from links where id_link = ?", [id]);
  res.redirect("/link");
});

module.exports = router;
