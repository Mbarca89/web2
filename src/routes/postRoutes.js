import express from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { uploadPostImages } from "../middlewares/uploadMiddleware.js"
import {
  showCreatePostForm,
  createPost,
} from "../controllers/postController.js"

const router = express.Router();

router.get("/create", requireAuth, showCreatePostForm)
router.post("/", requireAuth, uploadPostImages, createPost)

export default router