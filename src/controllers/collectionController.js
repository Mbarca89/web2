import {
  getUserCollections,
  getCollectionById,
  createCollection,
  addPostToCollection,
  removePostFromCollection,
} from "../services/collectionService.js"

export async function showCollections(req, res) {
  try {
    const collections = await getUserCollections(req.user.id)

    return res.render("collections", {
      title: "Mis colecciones",
      collections,
    })
  } catch (error) {
    console.error(error)

    return res.redirect("/me")
  }
}

export async function showCollection(req, res) {
  try {
    const collection = await getCollectionById(
      req.params.id,
      req.user.id
    )

    return res.render("collection", {
      title: collection.name,
      collection,
    })
  } catch (error) {
    console.error(error)

    return res.redirect("/collections")
  }
}

export async function createCollectionAction(req, res) {
  try {
    const collection = await createCollection({
      userId: req.user.id,
      name: req.body.name,
    })

    return res.json({
      success: true,
      collection: {
        id: collection.id,
        name: collection.name,
      },
      message: "Colección creada",
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export async function addPostAction(req, res) {
  try {
    await addPostToCollection({
      collectionId: req.params.id,
      postId: req.params.postId,
      userId: req.user.id,
    })

    return res.json({
      success: true,
      message: "Publicación guardada",
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export async function removePostAction(req, res) {
  try {
    await removePostFromCollection({
      collectionId: req.params.id,
      postId: req.params.postId,
      userId: req.user.id,
    })

    return res.json({
      success: true,
      message: "Publicación eliminada de la colección",
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export async function listCollections(req, res) {
  try {
    const collections = await getUserCollections(req.user.id)

    return res.json({
      success: true,
      collections: collections.map(collection => ({
        id: collection.id,
        name: collection.name,
      })),
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: "No se pudieron cargar las colecciones",
    })
  }
}