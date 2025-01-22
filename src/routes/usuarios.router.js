import { Router } from "express";
// import generarUsuarios from "../utils/usuarios.util.js"
import CustomError from "../services/errors/custom-error.js";
import { generarInfoError } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js"

const router = Router();

// router.get("/", (req, res) => {
//     const usuarios = [];
//     for (let i = 0; i < 10; i++) {
//         usuarios.push(generarUsuarios());
//     }
//     res.json(usuarios);
// });

const arrayUsuarios = [];

router.post("/", async (req, res, next) => {
    const { nombre, apellido, email } = req.body;

    try {
        if (!nombre || !apellido || !email) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo",
                causa: generarInfoError({nombre, apellido, email}),
                mensaje: "Error al intentar crear un usuario",
                codigo: EErrors.TIPO_VALIDO
            })
        }
     
        const usuario = {
            nombre,
            apellido,
            email
        }

        arrayUsuarios.push(usuario);

        console.log(arrayUsuarios);

        res.send({ status: "success", payload: usuario });

    } catch (error) {
        next(error);
    }

})

export default router;