import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import User from "../models/User.js"
import Tag from "../models/Tag.js"
import { Op } from "sequelize"
import PostLike from "../models/PostLike.js"
import PostRating from "../models/PostRating.js"

export async function getFeedPosts(currentUser, filters = {}) {

  const { q, license } = filters

  const postWhere = {
    isActive: true,
  }

  const imageWhere = {}

  if (!currentUser) {
    imageWhere.licenseType = "FREE"
  }

  if (license) {
    imageWhere.licenseType = license
  }

  const searchWhere = q?.trim()
    ? {
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { "$User.username$": { [Op.iLike]: `%${q}%` } },
        { "$Tags.name$": { [Op.iLike]: `%${q}%` } },
      ],
    }
    : {}

  const posts = await Post.findAll({
    where: {
      ...postWhere,
      ...searchWhere,
    },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: PostImage,
        where: imageWhere,
        required: true,
      },
      {
        model: Tag,
        through: { attributes: [] },
      },
      {
        model: PostLike,
        attributes: ["id", "userId"],
        required: false,
      },
      {
        model: PostRating,
        required: false,
      }
    ],
    order: [["createdAt", "DESC"]],
  })

  return posts.map((post) => {

    const ratings = post.PostRatings || [];

    const ratingsCount = ratings.length;

    const ratingAvg =
      ratingsCount === 0
        ? 0
        : (
          ratings.reduce(
            (acc, rating) => acc + rating.value,
            0
          ) / ratingsCount
        ).toFixed(1);

    const ratedByCurrentUser =
      currentUser &&
      ratings.some(
        (rating) => rating.userId === currentUser.id
      );

    return {
      id: post.id,
      userId: post.User.id,
      title: post.title,
      description: post.description,
      username: post.User.username,
      images: post.PostImages.map((img) => ({
        id: img.id,
        imageData: img.imageData,
      })),
      licenseType: post.PostImages[0]?.licenseType,
      isForSale: post.PostImages[0]?.isForSale,
      price: post.PostImages[0]?.price,
      tags: post.Tags.map((tag) => tag.name),
      likesCount: post.PostLikes?.length || 0,
      likedByCurrentUser: currentUser
        ? post.PostLikes?.some((like) => like.userId === currentUser.id)
        : false,
      ratingAvg: parseFloat(ratingAvg),
      ratingsCount: ratingsCount,
      ratedByCurrentUser: ratedByCurrentUser,
    }
  })
}