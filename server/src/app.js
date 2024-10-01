import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {log} from './middlewares/log.js'
import { initDB } from './utils/db.js'
import "dotenv/config"
import UserRoutes from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 3310

app.use(cors({
    origin: "http://localhost:5173", // de base n'accepte pas les cookies, lien front à préciser
    credentials : true, // parametre par defaut - permet d'accepter les cookies
}
))
app.use(express.json())
app.use(cookieParser())
app.use(log)

app.use("/api/auth", UserRoutes)

// app.get("/", (req, res) => {
//     res.send("coucou")
// })

initDB()

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})