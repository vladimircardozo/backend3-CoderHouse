import express from "express";
import generatePet from "../../data/mongo/models/mocking.model.js";

const router = express.Router();

router.get('/mockingpets', (req, res) => {
    try {
        const mockPets = generatePet(100);
        res.status(200).json(mockPets);
    } catch (error) {
        console.error('Error al generar mascotas:', error);
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

export default router;