import express from "express";
import programmingLanguages from "./fakeDB/fakeDb.js";
import path from "path";
import { fileURLToPath } from "url";
import pug from "pug";

// fix for not having access to __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
server.set("view engine", "pug");
server.set("views", "./views");

server.get("/", (req, res, next) => {
  res.render("index", { programmingLanguages: programmingLanguages });
  next();
});

server.get("/comment", (req, res, next) => {
  // in order for a file to be send as a pug file it has to be compiled to a function
  // then create the send object by calling that function (u can also pass locals argument for data)
  const comment = pug.compileFile("views/comment.pug");
  const toSendback = comment();
  res.send(toSendback);
  next();
});

server.listen(8000, () => {
  console.log("Server listening on port http://localhost:8000");
});
