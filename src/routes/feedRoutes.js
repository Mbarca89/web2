const router = express.Router()
import express from "express"
import { showFeed } from "../controllers/feedController.js"

router.get("/", showFeed)

export default router
