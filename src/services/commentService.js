import PostComment from "../models/PostComment.js"
import User from "../models/User.js"

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

  return {
    id: comment.id,
    content: comment.content,
    username: user.username,
  }
}