import { createCommentService } from "../services/commentService.js"

export async function createComment(req, res) {
  try {
    const comment = await createCommentService({
      postId: req.params.postId,
      userId: req.user.id,
      content: req.body.content,
    })

    return res.json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}