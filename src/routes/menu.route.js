import { Router } from "express";
import { verifyToken } from "../middleware/authorization.js";
import authorizeStan from "../middleware/authorize_stan.js";
import { uploadMenuImage } from "../middleware/menu_upload.js";
import { createMenuValidation, updateMenuValidation } from "../middleware/menu_validation.js";
import { createMenu, deleteMenu, getAllStanWithMenus, getMenuAll, getMenuByStanId, getMenuDiskonAll, getMenuMakanan, getMenuMinuman, getMenuStan, searchMenu, updateMenu } from "../controllers/menu_controller.js";

const router = Router();

// ================= MENU FOR ROLE STAN =================

router.post(
  "/tambahmenu",
  verifyToken,
  authorizeStan,
  uploadMenuImage.single("foto"),
  createMenuValidation,
  createMenu
);

router.put(
  "/updatemenu/:id",
  verifyToken,
  authorizeStan,
  uploadMenuImage.single("foto"),
  updateMenuValidation,
  updateMenu
);

router.delete(
  "/hapus_menu/:id",
  verifyToken,
  authorizeStan,
  deleteMenu
);

router.get(
  "/showmenu",
  verifyToken,
  authorizeStan,
  getMenuStan
);

// ================= MENU FOR ALL USERS =================

router.get("/getmenudiskonsiswa", getMenuDiskonAll);
router.get("/getmenufood", getMenuMakanan);
router.get("/getmenudrink", getMenuMinuman);
router.get("/menu", getMenuAll);
router.get("/stan/:id", getMenuByStanId);
router.get("/stan", getAllStanWithMenus);
router.get("/search", searchMenu);

export default router;
