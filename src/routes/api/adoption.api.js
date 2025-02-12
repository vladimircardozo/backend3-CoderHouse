import { Router } from "express";
import {
  getAllAdoptions,
  getAdoption,
  createAdoption,
  updateAdoption,
  deleteAdoption,
} from "../../controllers/adoptions.controller.js";

const router = Router();

router.get("/", getAllAdoptions);
router.get("/:aid", getAdoption);
router.post("/:uid/:pid", createAdoption);
router.put("/:aid", updateAdoption);
router.delete("/:aid", deleteAdoption);

export default router;
