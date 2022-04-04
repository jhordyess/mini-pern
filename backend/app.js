const express = require("express");
const cors = require("cors");
const Articulo = require("./models/Articulo");

const app = express();
const port = 80;

app.use(cors());

app.use(express.json());

const arti = new Articulo();

app.get("/articulo", async (req, res) => {
  let data = { count: 0, data: [] };
  try {
    data = await arti.buscarArticulos(req.query);
  } catch (error) {
    data = { ok: false, msg: "Error al llamar" };
    console.log("error", error);
  } finally {
    await arti.desconectar();
    res.json(data);
  }
});

app.post("/articulo", async (req, res) => {
  let data = { ok: true };
  try {
    data = await arti.alta(req.body);
  } catch (error) {
    data.ok = false;
    data.msg = "Error al llamar";
    console.log("error", error);
  } finally {
    await arti.desconectar();
    res.json(data);
  }
});

app.listen(port, () => {
  console.log("Iniciado correctamente");
});
