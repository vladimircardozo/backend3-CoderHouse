import Adoption from "../data/mongo/models/adoption.model";

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate("user pet");
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener adopciones", error });
  }
};

export const getAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await Adoption.findById(aid).populate("user pet");

    if (!adoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }

    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la adopción", error });
  }
};

export const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    const newAdoption = new Adoption({
      user: uid,
      pet: pid,
    });

    await newAdoption.save();
    res.status(201).json({
      message: "✅ Adopción creada exitosamente",
      adoption: newAdoption,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al crear la adopción", error });
  }
};

export const updateAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const { status } = req.body;

    const adoption = await Adoption.findByIdAndUpdate(
      aid,
      { status },
      { new: true }
    );

    if (!adoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }

    res.json({ message: "✅ Adopción actualizada", adoption });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error al actualizar la adopción", error });
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const { aid } = req.params;

    const adoption = await Adoption.findByIdAndDelete(aid);

    if (!adoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }

    res.json({ message: "✅ Adopción eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error al eliminar la adopción", error });
  }
};
