import PostComment from "../models/PostComment.js"
import User from "../models/User.js"
import Post from "../models/Post.js"
import { createNotification } from "./notificationService.js"

export async function createCommentService({ postId, userId, content }) {
  if (!content?.trim()) {
    throw new Error("El comentario no puede estar vacío");
  }

  const comment = await PostComment.create({
    postId,
    userId,
    content: content.trim(),
  })

  const user = await User.findByPk(userId, {
    attributes: ["username"],
  })

  const post = await Post.findByPk(postId)

  if (post) {
    await createNotification({
      userId: post.user_id,
      actorId: userId,
      type: "COMMENT",
      message: "comentó tu publicación",
      link: `/feed#post-${postId}`,
    })
  }

  return {
    id: comment.id,
    content: comment.content,
    username: user.username,
  }
}