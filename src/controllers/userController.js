import { getUserProfile } from "../services/userService.js"

export async function showUserProfile(req, res) {
  try {
    const profile = await getUserProfile({
      profileUserId: req.params.id,
      currentUser: req.user,
    })

    return res.render("users/profile", {
      title: profile.user.username,
      profile,
    })
  } catch (error) {
    return res.redirect("/feed")
  }
}