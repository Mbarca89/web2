import sequelize from "../config/db/db.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import Tag from "../models/Tag.js"
import {convertImage} from "../services/imageConverter.js"

export async function createPostService({ userId, body, files }) {
  const {
    title,
    description,
    tags,
    licenseType,
    watermarkText,
    isForSale,
    price,
  } = body

  if (!title?.trim()) {
    throw new Error("El título es obligatorio")
  }

  if (!files || files.length === 0) {
    throw new Error("Tenés que subir al menos una imagen")
  }

  return sequelize.transaction(async (transaction) => {
    const post = await Post.create(
      {
        user_id: userId,
        title,
        description,
      },
      { transaction }
    );

    for (const file of files) {
      const imageData = await convertImage(file)

      await PostImage.create(
        {
          post_id: post.id,
          imageData,
          licenseType,
          watermarkText: licenseType === "COPYRIGHT" ? watermarkText : null,
          isForSale: isForSale === "on",
          price: isForSale === "on" && price ? price : null,
        },
        { transaction }
      )
    }

    if (tags?.trim()) {
      const tagNames = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)

      for (const tagName of tagNames) {
        const [tag] = await Tag.findOrCreate({
          where: { name: tagName },
          transaction,
        });

        await post.addTag(tag, { transaction })
      }
    }

    return post
  })
}