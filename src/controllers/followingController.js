import { getFollowingFeedPosts } from "../services/followingService.js"

export async function showFollowingFeed(req, res) {
  try {
    const posts = await getFollowingFeedPosts(req.user)

    return res.render("following", {
      title: "Siguiendo",
      posts,
    })
  } catch (error) {
    console.error(error)

    return res.render("following/index", {
      title: "Siguiendo",
      posts: [],
      errorMessage: "No se pudo cargar el feed de usuarios seguidos",
    })
  }
}