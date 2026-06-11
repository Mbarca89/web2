import { Op } from "sequelize"

import Follower from "../models/Follower.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import Tag from "../models/Tag.js"
import User from "../models/User.js"
import PostLike from "../models/PostLike.js"
import PostRating from "../models/PostRating.js"
import PostComment from "../models/PostComment.js"

export async function getFollowingFeedPosts(currentUser) {
  const follows = await Follower.findAll({
    where: {
      followerId: currentUser.id,
    },
  })

  const followingIds = follows.map((follow) => follow.followingId)

  if (followingIds.length === 0) {
    return []
  }

  const posts = await Post.findAll({
    where: {
      isActive: true,
      user_id: {
        [Op.in]: followingIds,
      },
    },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: PostImage,
        required: true,
      },
      {
        model: Tag,
        through: { attributes: [] },
        required: false,
      },
      {
        model: PostLike,
        required: false,
      },
      {
        model: PostRating,
        required: false,
      },
      {
        model: PostComment,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
        required: false,
      },
    ],
    order: [["createdAt", "DESC"]],
  })

  return posts.map((post) => {
    const ratings = post.PostRatings || []
    const ratingsCount = ratings.length

    const ratingAvg =
      ratingsCount === 0
        ? 0
        : Number(
            (
              ratings.reduce((acc, rating) => acc + rating.value, 0) /
              ratingsCount
            ).toFixed(1)
          )

    return {
      id: post.id,
      userId: post.User.id,
      title: post.title,
      description: post.description,
      username: post.User.username,
      createdAt: post.createdAt?.toLocaleDateString("es-AR"),
      images: post.PostImages.map((img) => ({
        id: img.id,
        imageData: img.imageData,
      })),
      licenseType: post.PostImages[0]?.licenseType,
      isForSale: post.PostImages[0]?.isForSale,
      price: post.PostImages[0]?.price,
      tags: post.Tags.map((tag) => tag.name),
      likesCount: post.PostLikes?.length || 0,
      likedByCurrentUser: post.PostLikes?.some(
        (like) => like.userId === currentUser.id
      ),
      ratingAvg,
      ratingsCount,
      ratedByCurrentUser: ratings.some(
        (rating) => rating.userId === currentUser.id
      ),
      comments:
        post.PostComments?.map((comment) => ({
          id: comment.id,
          content: comment.content,
          username: comment.User.username,
        })) || [],
    }
  })
}