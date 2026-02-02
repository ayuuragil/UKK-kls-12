import express from "express";
import {
  getAllSiswa,
  getSiswaById,
  registerSiswa,
  updateSiswa,
  deleteSiswa
} from "../controllers/siswa.controller.js";

import { authorize } from "../middleware/authorize.js";
import { IsAdmin } from "../middleware/authorize.js";

const router = express.Router();
import { upload } from "../middleware/upload.js";

router.post(
  "/register",
  upload.single("foto"), 
  registerSiswa
);


router.post("/register", registerSiswa);


router.get("/", authorize, IsAdmin, getAllSiswa);
router.get("/:id", authorize, IsAdmin, getSiswaById);
router.put("/:id", authorize, IsAdmin, updateSiswa);
router.delete("/:id", authorize, IsAdmin, deleteSiswa);

export default router;