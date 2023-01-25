// Meu backend
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/personRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/person", router);

const USERNAME = process.env.USERNAME_KEY;
const PASSWORD = process.env.PASSWORD_KEY;

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@apicluster.oe1r10i.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("conectado");
  })
  .catch((err) => {
    console.log(err);
  });

//backend guiado
// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const Person = require("./models/Person");

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// // criação de cadastro na database
// app.post("/person", async (req, res) => {
//   const { name, salary, approved } = req.body;

//   const person = {
//     name,
//     salary,
//     approved,
//   };

//   try {
//     await Person.create(person);
//     res.status(201).json({ msg: "Pessoa inserida com sucesso" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// // login database
// const USERNAME = process.env.USERNAME_KEY;
// const PASSWORD = process.env.PASSWORD_KEY;

// // conexão com a porta e database
// mongoose
//   .connect(
//     `mongodb+srv://${USERNAME}:${PASSWORD}@apicluster.oe1r10i.mongodb.net/?retryWrites=true&w=majority`
//   )
//   // se a conexão funcionar:
//   .then(() => {
//     console.log("bd conectado");
//     app.listen("3000");
//   })
//   // se a conexão falhar:
//   .catch((err) => {
//     console.log(err);
//   });
