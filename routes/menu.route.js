import express from "express"
import {
  createMenu,
  getMenuByStan,
  updateMenu,
  deleteMenu
} from "../controllers/menu_controller.js"
import { authorize } from "../middleware/authorize.js"

const router = express.Router()

router.post("/", authorize, createMenu)
router.get("/", authorize, getMenuByStan)
router.put("/:id", authorize, updateMenu)
router.delete("/:id", authorize, deleteMenu)

export default router
