import User from "../models/User.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import Tag from "../models/Tag.js"
import Follower from "../models/Follower.js"

export async function getUserProfile({ profileUserId, currentUser }) {
  const user = await User.findByPk(profileUserId, {
    attributes: ["id", "username", "email", "createdAt"],
  })

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const followersCount = await Follower.count({
    where: { followingId: profileUserId },
  })

  const followingCount = await Follower.count({
    where: { followerId: profileUserId },
  })

  const isOwnProfile =
    currentUser && Number(currentUser.id) === Number(profileUserId)

  const isFollowing = currentUser
    ? !!(await Follower.findOne({
        where: {
          followerId: currentUser.id,
          followingId: profileUserId,
        },
      }))
    : false

  const posts = await Post.findAll({
    where: {
      user_id: profileUserId,
      isActive: true,
    },
    include: [
      {
        model: PostImage,
        required: true,
      },
      {
        model: Tag,
        through: { attributes: [] },
        required: false,
      },
    ],
    order: [["createdAt", "DESC"]],
  })

  return {
    user,
    followersCount,
    followingCount,
    isOwnProfile,
    isFollowing,
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      images: post.PostImages.map((img) => ({
        id: img.id,
        imageData: img.imageData,
      })),
      tags: post.Tags.map((tag) => tag.name),
      licenseType: post.PostImages[0]?.licenseType,
      isForSale: post.PostImages[0]?.isForSale,
      price: post.PostImages[0]?.price,
    })),
  }
}