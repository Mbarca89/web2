import { createPostService, togglePostCommentsService, getPostForEdit, updatePostService } from "../services/postService.js"
import { validateCreatePost } from "../vaidators/postValidator.js"

export function showCreatePostForm(req, res) {
  return res.render("posts/create", {
    title: "Crear publicacion",
    fieldErrors: {},
    oldData: {},
  })
}

export async function createPost(req, res) {
  const fieldErrors = validateCreatePost({
    ...req.body,
    files: req.files,
  })

  if (Object.keys(fieldErrors).length > 0) {
    return res.render("posts/create", {
      title: "Crear publicacion",
      fieldErrors,
      oldData: req.body,
    })
  }

  try {
    await createPostService({
      userId: req.user.id,
      body: req.body,
      files: req.files,
    })

    return res.redirect("/feed");
  } catch (error) {
    return res.render("posts/create", {
      title: "Crear publicacion",
      fieldErrors: {},
      oldData: req.body,
      errorMessage: error.message || "No se pudo crear la publicacion",
    })
  }
}

export async function togglePostComments(req, res) {
  try {
    const post = await togglePostCommentsService({
      postId: req.params.id,
      userId: req.user.id,
    })

    return res.json({
      success: true,
      commentsEnabled: post.commentsEnabled,
      message: post.commentsEnabled
        ? "Comentarios habilitados"
        : "Comentarios deshabilitados",
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export async function showEditPost(req, res) {
  try {
    const post = await getPostForEdit({
      postId: req.params.id,
      userId: req.user.id,
    })

    return res.render("posts/edit", {
      title: "Editar publicación",
      post,
    })
  } catch (error) {
    console.error(error)

    return res.status(403).render("feed", {
      title: "Feed",
      posts: [],
      filters: {
        q: "",
        license: "",
      },
      errorMessage: error.message,
    })
  }
}

export async function updatePost(req, res) {
  try {
    await updatePostService({
      postId: req.params.id,
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    })

    return res.redirect("/me")
  } catch (error) {
    console.error(error)

    return res.status(400).render("posts/edit", {
      title: "Editar publicación",
      post: {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
      },
      errorMessage: error.message,
    })
  }
}