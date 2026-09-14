import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { uploadPostImages } from "../middlewares/uploadMiddleware.js"
import { showCreatePostForm, createPost, togglePostComments, showEditPost, updatePost } from "../controllers/postController.js"

const router = express.Router();

router.get("/create", requireAuth, showCreatePostForm)
router.post("/", requireAuth, uploadPostImages, createPost)
router.post("/:id/comments/toggle", requireAuth, togglePostComments)
router.get("/:id/edit", requireAuth, showEditPost)
router.post("/:id/edit", requireAuth, updatePost)

export default router