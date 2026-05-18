import User from "./models/User.js"
import sequelize from "./config/db/db.js"
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

app.set("view engine", "pug")
app.set("views", "./src/views")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.use(
    "/bootstrap",
    express.static("node_modules/bootstrap/dist")
)

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Servidor escuchando en:${process.env.PORT || 3000}`
    )
})