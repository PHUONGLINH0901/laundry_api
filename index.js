import express from "express";
import clientRouter from "./routers/index.route.js";
import cors from "cors";
import { database } from "./configs/database.config.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectRedis } from "./configs/redis.config.js";

const app = express();

// FIX PORT
const port = process.env.PORT || 4000;

// Connect services
database();
connectRedis();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:9104",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// Routes
app.use("/api/v1/laundry", clientRouter);

// Health check
app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
