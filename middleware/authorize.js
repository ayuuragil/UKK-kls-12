import jwt from "jsonwebtoken"

const SECRET_KEY = "ukk_kantin"

export const authorize = (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = header.split(" ")[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

export const IsAdmin = (req, res, next) => {
  if (req.user.role !== "admin_stan") {
    return res.status(403).json({
      message: "Akses ditolak (Admin only)"
    })
  }
  next()
}

export const IsSiswa = (req, res, next) => {
  if (req.user.role !== "siswa") {
    return res.status(403).json({
      message: "Akses ditolak (Siswa only)"
    })
  }
  next()
}
