import { getFeedPosts } from "../services/feedService.js"

export async function showFeed(req, res) {
  try {
    const posts = await getFeedPosts(req.user)

    return res.render("feed", {
      title: "Feed",
      posts,
    })
  } catch (error) {
    console.error(error)

    return res.render("feed", {
      title: "Feed",
      posts: [],
      errorMessage: "No se pudo cargar el feed",
    })
  }
}