import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/dbConfig.js";
import authRouter from "./src/routers/auth.router.js";
import morgan from "morgan";
import gameRouter from "./src/routers/games.router.js";
import cors from "cors";
import path from "path";
import { error } from "./src/utills/responseWrapper.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("common"));


app.route("/video/:name").get((req, res) => {
  try {
    const name = req.params.name;
    return res.sendFile(__dirname.slice(1) + `/public/videos/${name}`);
  } catch (err) {
    return res.send(error(500, err.message));
  }
});

// C:\Users\kulde\Desktop\super-admin-server\public\videos\1704702137096-How to upload file in backend  Multer.mp4
app.route("/image/:name").get((req, res) => {
  try {
    const name = req.params.name;
    return res.sendFile(__dirname.slice(1) + `/public/images/${name}`);
  } catch (err) {
    return res.send(error(500, err.message));
  }
});

app.use("/auth", authRouter);
app.use("/game", gameRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log("server is runnig at " + port);
});
