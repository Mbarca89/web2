import PostLike from "../models/PostLike.js"

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

  return {
    liked: true,
  }
}