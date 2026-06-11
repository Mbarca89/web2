import User from "../models/User.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import PostReport from "../models/PostReport.js"
import Follower from "../models/Follower.js"

export async function getMyDashboard(userId) {
  const user = await User.findByPk(userId, {
    attributes: ["id", "username", "email", "role", "createdAt"],
  })

  const posts = await Post.findAll({
    where: { user_id: userId },
    include: [
      { model: PostImage, required: false },
      {
        model: PostReport,
        required: false,
      },
    ],
    order: [["createdAt", "DESC"]],
  })

  const followersCount = await Follower.count({
    where: { followingId: userId },
  })

  const followingCount = await Follower.count({
    where: { followerId: userId },
  })

  const totalReports = posts.reduce(
    (acc, post) => acc + (post.PostReports?.length || 0),
    0
  )

  return {
    user,
    followersCount,
    followingCount,
    totalPosts: posts.length,
    totalReports,
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      isActive: post.isActive,
      createdAt: post.createdAt?.toLocaleDateString("es-AR"),
      image: post.PostImages?.[0]?.imageData,
      reportsCount: post.PostReports?.length || 0,
      reports:
        post.PostReports?.map((report) => ({
          id: report.id,
          reason: report.reason,
          description: report.description,
          createdAt: report.createdAt?.toLocaleDateString("es-AR"),
        })) || [],
    })),
  }
}