import { Router } from "express";
import { verifyToken } from "../middleware/authorization.js";
import { cetakNotaHtml, cetakNotaPdf } from "../controllers/nota_controller.js";

const router = Router();

router.get("/cetaknota/:id/html", verifyToken, cetakNotaHtml);
router.get("/cetaknota/:id/pdf", verifyToken, cetakNotaPdf);

export default router;
