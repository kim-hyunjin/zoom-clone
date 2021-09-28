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
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done(); // 프론트엔드에서 실행됨
    socket.to(roomName).emit("welcome", socket.nickname);
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
});

httpServer.listen(3000, () => {
  console.log("server start...");
});
