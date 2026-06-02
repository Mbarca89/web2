import { createPostService } from "../services/postService.js"
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