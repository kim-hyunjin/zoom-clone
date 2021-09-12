import express from "express";
import http from "http";
import path from "path";
import ws from "ws";

const __dirname = path.join(path.resolve(), "/src");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new ws.Server({ server });

server.listen(3000, () => {
  console.log("server start...");
});
