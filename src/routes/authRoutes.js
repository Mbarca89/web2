import express from "express"
import {
  showRegisterForm,
  registerUser,
} from "../controllers/authController.js"

const router = express.Router()

router.get("/register", showRegisterForm)
router.post("/register", registerUser)

export default router