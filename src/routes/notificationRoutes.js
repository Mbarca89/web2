import express from "express"
import { showNotifications, unreadCount, readNotification, readAllNotifications, } from "../controllers/notificationController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", requireAuth, showNotifications)

router.get("/unread-count", requireAuth, unreadCount)

router.post("/:id/read", requireAuth, readNotification)

router.post("/read-all", requireAuth, readAllNotifications)

export default router