import express from 'express';
import dotenv from "dotenv";
import dbConnect from './src/utils/dbConnect.util.js'

dotenv.config();
const PORT = process.env.PORT

const app = express();

dbConnect()
    .then(() => {
        app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT} 🚀`); });
    }) .catch ((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });


