import PostLike from "../models/PostLike.js"
import { togglePostLike } from "../services/likeService.js"

export async function toggleLike(req, res) {
  try {
    const { postId } = req.params;

    const result = await togglePostLike({
      postId,
      userId: req.user.id,
    })

    const likesCount = await PostLike.count({
      where: {
        postId,
      },
    })

    return res.json({
      success: true,
      liked: result.liked,
      likesCount,
    })
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar el like",
    })
  }
}