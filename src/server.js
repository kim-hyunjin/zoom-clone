import express from "express";
import path from "path";

const __dirname = path.join(path.resolve(), "/src");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

app.listen(3000, () => {
  console.log("server start...");
});
