import express from 'express';
import usuariosRouter from './usuarios.router.js';
import petsRouter from './api/pets.api.js'

const app = express();

app.use("/users", usuariosRouter);
app.use("/pets", petsRouter)

export default app;