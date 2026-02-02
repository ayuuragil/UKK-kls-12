import express from "express";
import {
  createTransaksi,
  getTransaksiSiswa,
  getTransaksiStan,
  konfirmasiTransaksi
} from "../controllers/transaksi.controller.js";

import { authorize } from "../middleware/authorize.js";
import { IsSiswa, IsAdmin } from "../middleware/role_validation.js";

const router = express.Router();


router.post("/", authorize, IsSiswa, createTransaksi);
router.get("/siswa", authorize, IsSiswa, getTransaksiSiswa);


router.get("/stan", authorize, IsAdmin, getTransaksiStan);
router.put("/:id/konfirmasi", authorize, IsAdmin, konfirmasiTransaksi);

export default router;
