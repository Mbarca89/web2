import sequelize from "../config/db/db.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"
import Tag from "../models/Tag.js"
import PostReport from "../models/PostReport.js"
import { convertImage } from "../services/imageConverter.js"

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

      const watermark = licenseType === "COPYRIGHT" ? watermarkText : null

      const imageData = await convertImage(file, watermark)

      await PostImage.create(
        {
          post_id: post.id,
          imageData,
          licenseType,
          watermarkText: watermark,
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

export async function togglePostCommentsService({ postId, userId }) {
  const post = await Post.findByPk(postId)

  if (!post) {
    throw new Error("Publicación no encontrada")
  }

  if (Number(post.user_id) !== Number(userId)) {
    throw new Error("No podés modificar esta publicación")
  }

  post.commentsEnabled = !post.commentsEnabled

  await post.save()

  return post
}

export async function getPostForEdit({ postId, userId }) {
  const post = await Post.findByPk(postId, {
    include: [
      {
        model: Tag,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: PostReport,
        attributes: ["id"],
      },
    ],
  })

  if (!post) {
    throw new Error("Publicación no encontrada")
  }

  if (Number(post.user_id) !== Number(userId)) {
    throw new Error("No podés editar esta publicación")
  }

  if (post.PostReports?.length > 0) {
    throw new Error(
      "La publicación no puede editarse porque tiene denuncias"
    )
  }

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    tags: post.Tags?.map(tag => tag.name).join(", ") || "",
  }
}

export async function updatePostService({
  postId,
  userId,
  title,
  description,
  tags,
}) {
  if (!title?.trim()) {
    throw new Error("El título es obligatorio")
  }

  const post = await Post.findByPk(postId, {
    include: [
      {
        model: PostReport,
        attributes: ["id"],
      },
    ],
  })

  if (!post) {
    throw new Error("Publicacion no encontrada")
  }

  if (Number(post.user_id) !== Number(userId)) {
    throw new Error("No podés editar esta publicación")
  }

  if (post.PostReports?.length > 0) {
    throw new Error(
      "La publicacion no puede editarse porque tiene denuncias"
    )
  }

  return sequelize.transaction(async transaction => {
    post.title = title.trim()
    post.description = description?.trim() || null

    await post.save({
      transaction,
    })

    const tagInstances = []

    if (tags?.trim()) {
      const tagNames = tags
        .split(",")
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean)

      for (const tagName of tagNames) {
        const [tag] = await Tag.findOrCreate({
          where: {
            name: tagName,
          },
          transaction,
        })

        tagInstances.push(tag)
      }
    }

    await post.setTags(tagInstances, {
      transaction,
    })

    return post
  })
}