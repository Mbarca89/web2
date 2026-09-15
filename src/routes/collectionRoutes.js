import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"

import {
    showCollections,
    showCollection,
    createCollectionAction,
    addPostAction,
    removePostAction,
    listCollections,
} from "../controllers/collectionController.js"

const router = express.Router()

router.get("/", requireAuth, showCollections)
router.get("/list", requireAuth, listCollections)
router.get("/:id", requireAuth, showCollection)

router.post("/", requireAuth, createCollectionAction)
router.post("/:id/posts/:postId", requireAuth, addPostAction)
router.delete("/:id/posts/:postId", requireAuth, removePostAction)


export default router