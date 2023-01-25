const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(person);
    if (!name) {
      res.status(500).json({ msg: "Nome obrigatorio" });
      return;
    } else {
      res.json({ msg: "Cadastro realizado" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(500).json({ erro: "Pessoa nao encontrada" });
      return;
    } else {
      res.status(200).json(person);
    }
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    const newPerson = await Person.updateOne({ _id: id }, person);
    if (newPerson.matchedCount === 0) {
      res.json({ msg: "Nenhum usuario encontrado" });
    } else {
      res.status(200).json(person);
    }
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(500).json({ msg: "Nenhum usuario encontrado" });
    return;
  }
  try {
    const person = await Person.deleteOne({ _id: id });
    res.status(200).json({ msg: "Perfil excluido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

module.exports = router;
