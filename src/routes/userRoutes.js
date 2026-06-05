import express from "express"
import { showUserProfile } from "../controllers/userController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/:id", showUserProfile)

export default router