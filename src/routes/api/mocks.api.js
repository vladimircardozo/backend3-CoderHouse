import express from "express";
// import generatePet from "../../data/mongo/models/mocking.model.js";
import generateUsers from "../../data/mongo/models/mockingUsers.model.js";

const router = express.Router();

router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateUsers(50);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al generar usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

export default router;