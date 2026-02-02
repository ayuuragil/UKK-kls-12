import { createDiskon, createMenuDiskon, getAllDiskon, getDiskonById, updateDiskon } from "../controllers/diskon_controller.js";
import { getMenuDiskonAll, getMenuDiskonByMenuId, updateMenuDiskon } from "../controllers/menu_controller.js";
import { verifyToken } from "../middleware/authorization.js";
import authorizeStan from "../middleware/authorize_stan.js";
import { createDiskonValidation, createMenuDiskonValidation, updateDiskonValidation, updateMenuDiskonValidation } from "../middleware/diskon_validation.js";
import { Router } from "express";

const router = Router();

// DISKON
router.post(
  "/tambahdiskon",
  verifyToken,
  authorizeStan,
  createDiskonValidation,
  createDiskon
);

router.put(
  "/updatediskon/:id",
  verifyToken,
  authorizeStan,
  updateDiskonValidation,
  updateDiskon
);

router.get(
  "/showdiskon",
  verifyToken,
  authorizeStan,
  getAllDiskon
);

router.get(
  "/detaildiskon/:id",
  verifyToken,
  authorizeStan,
  getDiskonById
);

// MENU DISKON
router.post(
  "/insert_menu_diskon",
  verifyToken,
  authorizeStan,
  createMenuDiskonValidation,
  createMenuDiskon
);

router.get(
  "/getmenudiskon",
  verifyToken,
  getMenuDiskonAll
);

router.get(
  "/getmenudiskon/:menuId",
  verifyToken,
  getMenuDiskonByMenuId
);

router.put(
  "/update_menu_diskon/:id",
  verifyToken,
  authorizeStan,
  updateMenuDiskonValidation,
  updateMenuDiskon
);

export default router;
