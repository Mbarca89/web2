import User from "./models/User.js"
import sequelize from "./config/db/db.js"
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import feedRoutes from "./routes/feedRoutes.js"
import session from "express-session"
import livereload from "livereload"
import connectLiveReload from "connect-livereload"
import cookieParser from "cookie-parser"
import { loadUser, requireAuth } from "./middlewares/authMiddleware.js"
import "./models/associations.js"
import postRoutes from "./routes/postRoutes.js"


dotenv.config()

const app = express()

app.use(cookieParser())
app.use(loadUser)

const liveReloadServer = livereload.createServer({
  exts: ["pug", "css", "js"],
  delay: 100,
})

liveReloadServer.watch([
  "src/views",
  "public",
])

app.use(connectLiveReload())

app.set("view engine", "pug")
app.set("views", "./src/views")
app.locals.basedir = "./src";

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.use(
  "/bootstrap",
  express.static("node_modules/bootstrap/dist")
)
app.use(
  "/toastify",
  express.static("node_modules/toastify-js/src")
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  res.locals.successMessage = req.session.successMessage
  res.locals.errorMessage = req.session.errorMessage

  delete req.session.successMessage
  delete req.session.errorMessage

  next()
})

app.use("/auth", authRoutes)
app.use("/feed", feedRoutes)
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.render("landing", {
    title: "Inicio",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor escuchando en:${process.env.PORT || 3000}`
  )
})