import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { toggleLike } from "../controllers/likeController.js"

const router = express.Router()

router.post("/:postId/toggle", requireAuth, toggleLike)

export default router