import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import feedRoutes from "./routes/feedRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { loadUser } from "./middlewares/authMiddleware.js"

import "./models/associations.js"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(loadUser)

app.set("view engine", "pug")
app.set("views", "./src/views")
app.locals.basedir = "./src"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"))
app.use("/toastify", express.static("node_modules/toastify-js/src"))

app.use("/auth", authRoutes)
app.use("/feed", feedRoutes)
app.use("/posts", postRoutes)

app.get("/", (req, res) => {
  res.render("landing", {
    title: "Inicio",
  })
})

export default app