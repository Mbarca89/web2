import { getMyDashboard } from "../services/meService.js"

export async function showMyDashboard(req, res) {
  try {
    const dashboard = await getMyDashboard(req.user.id)

    return res.render("users/me", {
      title: "Mi perfil",
      dashboard,
    })
  } catch (error) {
    console.error(error)

    return res.redirect("/feed")
  }
}