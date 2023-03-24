import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT | 5000;

const server = http.createServer(app);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is running at: localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
