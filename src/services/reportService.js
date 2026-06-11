import Post from "../models/Post.js"
import PostReport from "../models/PostReport.js"

export async function createReport({ postId, reporterId, reason, description }) {
  if (!reason?.trim()) {
    throw new Error("Tenes que elegir un motivo")
  }

  const post = await Post.findByPk(postId)

  if (!post) {
    throw new Error("La publicacion no existe")
  }

  if (Number(post.user_id) === Number(reporterId)) {
    throw new Error("No podes denunciar tu propia publicacion")
  }

  const existingReport = await PostReport.findOne({
    where: {
      postId,
      reporterId,
    },
  })

  if (existingReport) {
    throw new Error("Ya denunciaste esta publicacion")
  }

  await PostReport.create({
    postId,
    reporterId,
    reason,
    description,
  })

  return true
}