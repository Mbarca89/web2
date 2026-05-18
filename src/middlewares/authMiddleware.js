import jwt from "jsonwebtoken"

export function loadUser(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    res.locals.currentUser = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    res.locals.currentUser = decoded
  } catch (error) {
    res.clearCookie("token")
    res.locals.currentUser = null
  }

  next()
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.redirect("/auth/login")
  }

  next()
}