import express from "express"
import clientRouter from "./routers/index.route.js"
import cors from "cors"
import { database } from "./configs/database.config.js";
import "dotenv/config"
import cookieParser from "cookie-parser";
import { connectRedis } from "./configs/redis.config.js";
const app = express()
const port = process.env.PORT
database();
connectRedis();
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:9104/",
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use("/api/client", clientRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})