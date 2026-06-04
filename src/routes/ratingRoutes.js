import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { ratePostController } from "../controllers/ratingController.js"

const router = express.Router()

router.post("/:postId", requireAuth, ratePostController)

export default router