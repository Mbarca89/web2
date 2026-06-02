import express from "express"
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
} from "../controllers/authController.js"

const router = express.Router()

router.get("/register", showRegisterForm)
router.get("/login", showLoginForm)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router