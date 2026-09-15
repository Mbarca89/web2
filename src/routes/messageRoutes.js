import express from "express"

import { requireAuth } from "../middlewares/authMiddleware.js"

import {
    interestInPost,
    showConversations,
    showConversation,
    listMessages,
    sendMessageAction,
} from "../controllers/messageController.js"

const router = express.Router()

router.post("/interest/:postId", requireAuth, interestInPost)
router.get("/", requireAuth, showConversations)
router.get("/:id", requireAuth, showConversation)
router.get("/:id/messages", requireAuth, listMessages)
router.post("/:id/messages", requireAuth, sendMessageAction)

export default router