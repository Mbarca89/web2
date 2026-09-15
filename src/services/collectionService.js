import Collection from "../models/Collection.js"
import Post from "../models/Post.js"
import PostImage from "../models/PostImage.js"

export async function getUserCollections(userId) {
  return Collection.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Post,
        as: "Posts",
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    ],
    order: [["createdAt", "DESC"]],
  })
}

export async function getCollectionById(collectionId, userId) {
  const collection = await Collection.findOne({
    where: {
      id: collectionId,
      user_id: userId,
    },
    include: [
      {
        model: Post,
        as: "Posts",
        through: {
          attributes: [],
        },
        include: [
          {
            model: PostImage,
            limit: 1,
          },
        ],
      },
    ],
  })

  if (!collection) {
    throw new Error("Colección no encontrada")
  }

  return collection
}

export async function createCollection({ userId, name }) {
  if (!name?.trim()) {
    throw new Error("El nombre de la colección es obligatorio")
  }

  const [collection, created] = await Collection.findOrCreate({
    where: {
      user_id: userId,
      name: name.trim(),
    },
    defaults: {
      user_id: userId,
      name: name.trim(),
    },
  })

  if (!created) {
    throw new Error("Ya hay una colección con ese nombre")
  }

  return collection
}

export async function addPostToCollection({
  collectionId,
  postId,
  userId,
}) {
  const collection = await Collection.findOne({
    where: {
      id: collectionId,
      user_id: userId,
    },
  })

  if (!collection) {
    throw new Error("Colección no encontrada")
  }

  const post = await Post.findByPk(postId)

  if (!post) {
    throw new Error("Publicación no encontrada")
  }

  const alreadySaved = await collection.hasPost(post)

  if (alreadySaved) {
    throw new Error("La publicación ya está guardada en esta colección")
  }

  await collection.addPost(post)

  return collection
}

export async function removePostFromCollection({
  collectionId,
  postId,
  userId,
}) {
  const collection = await Collection.findOne({
    where: {
      id: collectionId,
      user_id: userId,
    },
  })

  if (!collection) {
    throw new Error("Colección no encontrada")
  }

  const post = await Post.findByPk(postId)

  if (!post) {
    throw new Error("Publicación no encontrada")
  }

  await collection.removePost(post)
}