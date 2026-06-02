import { getFeedPosts } from "../services/feedService.js"

export async function showFeed(req, res) {
  try {
    const filters = {
      q: req.query.q || "",
      license: req.query.license || "",
    }

    const posts = await getFeedPosts(req.user, filters)

    return res.render("feed", {
      title: "Feed",
      posts,
      filters,
    })
  } catch (error) {
    console.error(error)

    return res.render("feed", {
      title: "Feed",
      posts: [],
      filters: {
        q: "",
        license: "",
      },
      errorMessage: "No se pudo cargar el feed",
    })
  }
}