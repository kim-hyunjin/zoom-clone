import express from "express";
import http from "http";
import path from "path";
import WebSocket from "ws";

const __dirname = path.join(path.resolve(), "/src");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from browser ❌"));
  socket.on("message", (message) => console.log(message));
  socket.send("hello!!");
});

server.listen(3000, () => {
  console.log("server start...");
});
