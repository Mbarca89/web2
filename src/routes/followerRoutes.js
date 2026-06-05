import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { toggleFollowController } from "../controllers/followerController.js"

const router = express.Router()

router.post("/:userId/toggle", requireAuth, toggleFollowController)

export default router