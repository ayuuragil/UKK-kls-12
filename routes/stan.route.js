import express from "express";
import {
  createStan,
  getAllStan,
  getStanById,
  updateStan,
  deleteStan
} from "../controllers/stan_controller.js";

import { authorize, IsAdmin } from "../middleware/authorize.js";

const router = express.Router();

router.post("/register", authorize, IsAdmin, createStan);


router.get("/", getAllStan); 
router.get("/:id", getStanById); 
router.put("/:id", authorize, IsAdmin, updateStan);
router.delete("/:id", authorize, IsAdmin, deleteStan);

export default router;
