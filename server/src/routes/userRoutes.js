import * as UserControllers from '../controllers/usersControllers.js' // import toutes les fonctions du fichier
import express from 'express'

const router = express.Router()

router.get("/protected", UserControllers.protectedRoutes)

router.post("/register", UserControllers.register)
router.post("/login", UserControllers.login)
router.post("/logout", UserControllers.logout)

export default router