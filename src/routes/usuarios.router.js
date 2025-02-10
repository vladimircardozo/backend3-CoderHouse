import { Router } from "express";
import User from "../data/mongo/models/user.model.js";  // Asegúrate de que el modelo esté correctamente importado
import CustomError from "../services/errors/custom-error.js";
import { generarInfoError } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js";
import validator from "validator";  // Para validación de email

const router = Router();

router.post("/", async (req, res, next) => {
    const { nombre, apellido, email, password, role } = req.body;

    try {
        // Validación de datos
        if (!nombre || !apellido || !email || !password) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo",
                causa: generarInfoError({ nombre, apellido, email, password }),
                mensaje: "Error al intentar crear un usuario, faltan datos",
                codigo: EErrors.TIPO_VALIDO
            });
        }

        // Validación de email
        if (!validator.isEmail(email)) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo",
                causa: "El formato del correo electrónico es incorrecto",
                mensaje: "Error al intentar crear un usuario, correo inválido",
                codigo: EErrors.TIPO_VALIDO
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo",
                causa: `Ya existe un usuario con el email: ${email}`,
                mensaje: "Error al intentar crear un usuario, el correo ya está registrado",
                codigo: EErrors.TIPO_VALIDO
            });
        }

        // Crear el nuevo usuario
        const usuario = new User({
            name: nombre,
            email,
            password,  // Asegúrate de encriptar la contraseña antes de guardarla en producción
            role: role || "USER",
        });

        // Guardar en la base de datos
        await usuario.save();

        res.status(201).send({
            status: "success",
            payload: usuario
        });

    } catch (error) {
        next(error);
    }
});

export default router;
