import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Format token salah" });
    }

    const secret = process.env.SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT secret belum diset" });
    }

    const decoded = jwt.verify(token, secret);

    // SIMPAN PAYLOAD KE REQUEST
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { verifyToken };
