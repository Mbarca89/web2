import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { showMyDashboard } from "../controllers/meController.js"

const router = express.Router()

router.get("/", requireAuth, showMyDashboard)

export default router