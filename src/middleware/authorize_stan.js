import jwt from "jsonwebtoken";

const authorizeStan = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token is missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.SECRET;

    if (!secret) {
      return res.status(500).json({ message: "JWT secret belum diset" });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "ADMIN_STAN") {
      return res.status(403).json({
        message: "Forbidden, only admins can perform this action",
      });
    }

    // Optional: simpan user ke req biar bisa dipakai di controller
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authorizeStan;
