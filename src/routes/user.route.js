import express from "express";
import {
  authentication,
  createSiswa,
  createStan,
  getProfileSiswa,
  getProfileStan,
  updateSiswa,
  updateStan,
} from "../controllers/user_controller.js";
import {
  createSiswaValidation,
  createStanValidation,
  loginValidation,
  updateSiswaValidation,
  updateStanValidation,
} from "../middleware/user_validations.js";
import { uploadUserImage } from "../middleware/user_upload.js";
import { verifyToken } from "../middleware/authorization.js";
import authorizeStan from "../middleware/authorize_stan.js";

const router = express.Router();

/* =====================
   ROUTE SISWA
===================== */

router.post("/register_siswa", createSiswaValidation, createSiswa);
router.post("/login_siswa", loginValidation, authentication);
router.get("/get_profile", verifyToken, getProfileSiswa);
router.put(
  "/update_siswa",
  verifyToken,
  uploadUserImage.single("foto"),
  updateSiswaValidation,
  updateSiswa,
);

/* =====================
   ROUTE STAN
===================== */

router.post("/register_stan", createStanValidation, createStan);
router.post("/login_stan", loginValidation, authentication);

router.put(
  "/update_stan",
  verifyToken,
  authorizeStan,
  uploadUserImage.single("foto"),
  updateStanValidation,
  updateStan,
);

router.get("/get_stan", verifyToken, authorizeStan, getProfileStan);

/* =====================
   SISWA OLEH STAN
===================== */

router.post(
  "/tambah_siswa",
  verifyToken,
  authorizeStan,
  createSiswaValidation,
  createSiswa,
);

// router.put(
//   "/ubah_siswa/:id",
//   verifyToken,
//   authorizeStan,
//   uploadUserImage.single("foto"),
//   updateSiswaValidation,
//   updateSiswaByStan,
// );

// router.get("/get_siswa", verifyToken, authorizeStan, getAllSiswa);

// router.delete("/hapus_siswa/:id", verifyToken, authorizeStan, deleteSiswa);

/* =====================
   GENERAL LOGIN
===================== */

router.post("/login", loginValidation, authentication);

export default router;
