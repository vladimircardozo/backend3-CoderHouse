import express from 'express';
import dotenv from "dotenv";
import dbConnect from './src/utils/dbConnect.util.js'
import appRouter from './src/routes/app.router.js'

dotenv.config();
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

dbConnect()
    .then(() => {
        app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT} 🚀`); });
    }) .catch ((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });