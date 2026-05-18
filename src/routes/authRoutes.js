import express from "express"
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
} from "../controllers/authController.js"

const router = express.Router()

router.get("/register", showRegisterForm)
router.get("/login", showLoginForm)
router.post("/register", registerUser)
router.post("/login", loginUser)

export default router