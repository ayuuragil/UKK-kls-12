import { PrismaClient } from "@prisma/client"
import md5 from "md5"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const SECRET_KEY = "ukk_kantin" 

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password wajib diisi"
      })
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: md5(password)
      },
      select: {
        id_user: true,
        username: true,
        role: true
      }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah"
      })
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        username: user.username,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    )

    res.json({
      success: true,
      message: "Login berhasil",
      token: token,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const authorize = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid"
      })
    }

    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
  }
}

export const authenticate = async (req, res) => {
    const {username, password} = req.body
    try {
        const userCek = await prisma.user.findFirst({
            where:{
                username : username,
                password: password
            }
        })
        if(userCek){
            const payload = JSON.stringify(userCek)
            const token = jwt.sign(payload, secretKey)
            res.status(200).json({
                succes: true,
                logged: true,
                message: 'login succes',
                token: token,
                data: userCek
            })
        }else{
            res.status(404).json({
                succes: false,
                logged: false,
                message: 'username or password invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}