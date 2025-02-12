import express from "express";
import usuariosRouter from "./usuarios.router.js";
import mocksRouter from "./api/mocks.api.js";
import adoptionRouter from "./api/adoption.api.js";

const app = express();

app.use("/users", usuariosRouter);
app.use("/api/mocks", mocksRouter);
app.use("/adoptions", adoptionRouter);

export default app;
