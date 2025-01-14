import { Router } from "express";
import generarUsuarios from "../utils/usuarios.util.js"

const router = Router();

router.get("/", (req, res) => {
    const usuarios = [];
    for (let i = 0; i < 10; i++) {
        usuarios.push(generarUsuarios());
    }
    res.json(usuarios);
});


export default router;