import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import User from "../models/User.js"
import Tag from "../models/Tag.js"

export async function getFeedPosts(currentUser) {
  const imageWhere = currentUser
    ? {}
    : { licenseType: "FREE" }

  const posts = await Post.findAll({
    where: {
      isActive: true,
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
    ],
    order: [["createdAt", "DESC"]],
  })

  return posts.map((post) => ({
    id: post.id,
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
    likesCount: 0,
    ratingAvg: 0,
  }))
}