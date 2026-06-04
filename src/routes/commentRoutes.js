import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { createComment } from "../controllers/commentController.js"

const router = express.Router()

router.post("/:postId", requireAuth, createComment)

export default router