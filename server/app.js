import express from "express";
import config from "config";

import "./utils/dbConnect.js";
import publicRouter from "./controllers/public/index.js";
import userRouter from "./controllers/users/index.js";
import cors from "cors"
const app = express();
app.use(express.json());
const PORT = config.get("PORT");

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "HELLO world" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fullstack.suhail.app"],
  })
)
app.use("/api/public", publicRouter);
app.use("/api/private/users", userRouter);

app.use((req, res) => {
  res.status(400).json({ msg: "invalid route" });
});
app.listen(PORT, () => {
  console.log(`PORT SERVER ${PORT} is up and listening`);
});
