import PostLike from "../models/PostLike.js"
import Post from "../models/Post.js"
import { createNotification } from "./notificationService.js"

export async function togglePostLike({ postId, userId }) {
  const existingLike = await PostLike.findOne({
    where: {
      postId,
      userId,
    },
  })

  if (existingLike) {
    await existingLike.destroy();

    return {
      liked: false,
    }
  }

  await PostLike.create({
    postId,
    userId,
  })

  const post = await Post.findByPk(postId)

  if (post) {
    await createNotification({
      userId: post.user_id,
      actorId: userId,
      type: "LIKE",
      message: "le gusto tu publicación",
      link: `/feed#post-${postId}`,
    })
  }

  return {
    liked: true,
  }
}