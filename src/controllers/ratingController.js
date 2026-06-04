import { ratePost } from "../services/ratingService.js"

export async function ratePostController(req, res) {
  try {
    const { postId } = req.params
    const { value } = req.body

    const result = await ratePost({
      postId,
      userId: req.user.id,
      value,
    })

    return res.json({
      success: true,
      ...result,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}