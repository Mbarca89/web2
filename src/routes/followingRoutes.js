import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { showFollowingFeed } from "../controllers/followingController.js"

const router = express.Router()

router.get("/", requireAuth, showFollowingFeed)

export default router