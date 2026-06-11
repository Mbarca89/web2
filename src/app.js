import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import feedRoutes from "./routes/feedRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { loadUser } from "./middlewares/authMiddleware.js"
import likeRoutes from "./routes/likeRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import followerRoutes from "./routes/followerRoutes.js"
import followingRoutes from "./routes/followingRoutes.js"

import path from "path"
import { fileURLToPath } from "url"

import "./models/associations.js"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(loadUser)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
app.locals.basedir = path.join(__dirname, "views")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const publicPath = path.join(__dirname, "../public")
const bootstrapPath = path.join(__dirname, "../node_modules/bootstrap/dist")
const toastifyPath = path.join(__dirname, "../node_modules/toastify-js/src")
const iconsPath = path.join(__dirname, "../node_modules/bootstrap-icons/font")

app.use(express.static(publicPath))
app.use("/bootstrap", express.static(bootstrapPath))
app.use("/toastify", express.static(toastifyPath))
app.use("/bootstrap-icons", express.static(iconsPath))

app.use("/auth", authRoutes)
app.use("/feed", feedRoutes)
app.use("/posts", postRoutes)
app.use("/likes", likeRoutes)
app.use("/ratings", ratingRoutes)
app.use("/comments", commentRoutes)
app.use("/users", userRoutes)
app.use("/followers", followerRoutes)
app.use("/following", followingRoutes)

app.get("/", (req, res) => {
  res.render("landing", {
    title: "Inicio",
  })
})

export default app