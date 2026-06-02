import { validateRegister } from "../vaidators/registerValidator.js"
import { validateLogin } from "../vaidators/loginValidator.js"
import { registerUserService } from "../services/authService.js"
import { loginUserService } from "../services/authService.js"

export function showRegisterForm(req, res) {
  return res.render("auth/register", {
    title: "Registro",
    fieldErrors: {},
    oldData: {},
  })
}

export function showLoginForm(req, res) {
  return res.render("auth/login", {
    title: "Iniciar Sesion",
    fieldErrors: {},
    oldData: {},
  })
}

export async function registerUser(req, res) {
  const { username, email, password, confirmPassword } = req.body

  const fieldErrors = validateRegister({
    username,
    email,
    password,
    confirmPassword,
  })

  if (Object.keys(fieldErrors).length > 0) {
    return res.render("auth/register", {
      title: "Registro",
      oldData: { username, email },
      fieldErrors,
    })
  }

  try {
    await registerUserService({
      username,
      email,
      password,
    })

    req.session.successMessage = "Usuario registrado correctamente"

    return res.redirect("/auth/login")
  } catch (error) {
    return res.render("auth/register", {
      title: "Registro",
      oldData: { username, email },
      fieldErrors: {},
      errorMessage: error.message || "Ocurrió un error al registrar el usuario",
    })
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body

  const fieldErrors = validateLogin({ username, password })

  if (Object.keys(fieldErrors).length > 0) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      fieldErrors,
      oldData: { username },
    })
  }

  try {
    const { user, token } = await loginUserService({ username, password })

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.redirect("/feed")
  } catch (error) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      fieldErrors: {},
      oldData: { username },
      errorMessage: error.message,
    })
  }
}

export function logoutUser(req, res) {
  res.clearCookie("token")
  return res.redirect("/auth/login")
}

