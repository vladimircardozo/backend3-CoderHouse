import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server as socketIOserver } from "socket.io";
import http from "http";
import path from "path";
import setupSocket from "./src/utils/socket.util.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import appRouter from "./src/routes/app.router.js";
import Product from "./src/data/mongo/models/product.model.js";
import compression from "express-compression";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new socketIOserver(server);

app.use(express.json());
app.use(compression({
  brotli: {
    enabled: true,
    zlib: {}
  }
}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use("/", appRouter);

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(
      "Error al cargar los productos desde la base de datos:",
      error
    );
    return res.status(500).json({ message: "Error al cargar los productos" });
  }
});

setupSocket(io);

dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
