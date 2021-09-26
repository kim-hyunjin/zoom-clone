import express from "express";
import http from "http";
import path from "path";
import { Server as SocketIO } from "socket.io";

const __dirname = path.join(path.resolve(), "/src");
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("hello from the backend!");
    }, 10000);
  });
});

httpServer.listen(3000, () => {
  console.log("server start...");
});
