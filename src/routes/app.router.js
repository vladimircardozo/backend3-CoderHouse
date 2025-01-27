import express from "express";
import usuariosRouter from "./usuarios.router.js";
import mocksRouter from "./api/mocks.api.js";

const app = express();

app.use("/users", usuariosRouter);
app.use("/api/mocks", mocksRouter);

export default app;
