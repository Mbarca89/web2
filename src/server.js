import User from "./models/User.js"
import sequelize from "./config/db/db.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Tables synced")
    });



const app = express()

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Servidor escuchando en:${process.env.PORT || 3000}`
    )
})