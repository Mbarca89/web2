import bcrypt from "bcrypt"
import User from "../models/User.js"

export function showRegisterForm(req, res) {
  res.render("auth/register", {
    title: "Registro",
    error: null,
    oldData: {},
  });
}

export async function registerUser(req, res) {
  try {
    const { username, email, password, confirmPassword } = req.body

    if (!username || !email || !password || !confirmPassword) {
      return res.render("auth/register", {
        title: "Registro",
        error: "Todos los campos son obligatorios",
        oldData: { username, email },
      });
    }

    if (password !== confirmPassword) {
      return res.render("auth/register", {
        title: "Registro",
        error: "Las contraseñas no coinciden",
        oldData: { username, email },
      });
    }

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.render("auth/register", {
        title: "Registro",
        error: "Ya existe un usuario registrado con ese email",
        oldData: { username, email },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.redirect("/auth/login")
  } catch (error) {
    console.error(error)

    res.render("auth/register", {
      title: "Registro",
      error: "Ocurrió un error al registrar el usuario",
      oldData: req.body,
    })
  }
}