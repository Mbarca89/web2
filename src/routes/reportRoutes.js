import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { createReportController } from "../controllers/reportController.js"

const router = express.Router()

router.post("/:postId", requireAuth, createReportController)

export default router