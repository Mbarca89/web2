import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function registerUserService({ username, email, password }) {
  const existingEmail = await User.findOne({ where: { email } })

  if (existingEmail) {
    throw new Error("Ya existe un usuario registrado con ese email")
  }

  const existingUsername = await User.findOne({ where: { username } })

  if (existingUsername) {
    throw new Error("Ya existe un usuario con ese nombre")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  return User.create({
    username,
    email,
    password: hashedPassword,
  })
}

export async function loginUserService({ username, password }) {
  const user = await User.findOne({ where: { username } });

  if (!user) throw new Error("Usuario o contraseña incorrectos");

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw new Error("Usuario o contraseña incorrectos");

  if (!user.active) throw new Error("La cuenta se encuentra inactiva");

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  return { user, token };
}