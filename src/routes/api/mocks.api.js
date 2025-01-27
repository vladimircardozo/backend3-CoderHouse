import express from "express";
import generatePets from "../../data/mongo/models/mockingPets.model.js";
import generateUsers from "../../data/mongo/models/mockingUsers.model.js";
import User from "../../data/mongo/models/user.model.js";
import Pet from "../../data/mongo/models/pet.model.js";

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

router.post("/generateData", async (req, res) => {
    const { users, pets } = req.body;
  
    // Validar los parámetros recibidos
    if (!Number.isInteger(users) || users < 0 || !Number.isInteger(pets) || pets < 0) {
      return res.status(400).json({ error: "Los parámetros 'users' y 'pets' deben ser números positivos." });
    }
  
    try {
      // Generar usuarios y guardarlos en la base de datos
      const generatedUsers = await Promise.all(
        Array.from({ length: users }, () => generateUsers(1)) // Generar usuarios
      );
      const flattenedUsers = generatedUsers.flat(); // Aplanar el array generado
      const insertedUsers = await User.insertMany(flattenedUsers); // Guardar en la base de datos
  
      // Generar mascotas y guardarlas en la base de datos
      const generatedPets = generatePets(pets); // Generar mascotas
      const insertedPets = await Pet.insertMany(generatedPets); // Guardar en la base de datos
  
      res.status(201).json({
        message: "Datos generados exitosamente.",
        generatedUsers: insertedUsers.length,
        generatedPets: insertedPets.length,
      });
    } catch (error) {
      console.error("Error al generar datos:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });

export default router;