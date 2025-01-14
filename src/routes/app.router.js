import express from 'express';
import usuariosRouter from './usuarios.router.js';

const app = express();

app.use("/users", usuariosRouter);

export default app;