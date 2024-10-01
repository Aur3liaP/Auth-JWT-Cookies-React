import { User } from "../models/usersModels.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, password} = req.body

    if (!username || !password){
        return register.status(400).json({message: "Username or password required"})
    }

    const existingUser = await User.findUserByUsername(username)

    if(existingUser){
        return res.status(400).json({message : "User already exists"})
    } 

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({username: username, password: hashedPassword})

    res.status(201).json({message: "User registred"})
}

export const login = async(req, res) => {
    const { username, password} = req.body
    const user = await User.findUserByUsername(username)

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({message : "Invalid credentials"})
    }
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {  // ne jamais mettre mdp !
        expiresIn:"1h"
    })

    res.cookie("token", token, {
        httpOnly: false, // Empêche injections ja
        secure: false, // A changer si lien site en httpS
        sameSite: "Strict" // Evite echange de cookies enrte site internet autres que ceux du cors
    })

    res.status(200).json({message: "Logged in successfully"})

}

export const protectedRoutes = (req, res) => {
    const token = req.cookies.token
    if (!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.status(200).json({message :`Welcome user ${decoded.id}`})
    } catch (err) {
        res.status(401).json()
    }
}    


export const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({message: "Logout"})
}