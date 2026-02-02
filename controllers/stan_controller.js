import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak valid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
};

export const createStan = async (req, res) => {
  try {
    const { nama_stan, nama_pemilik, telp } = req.body;

    if (!nama_stan || !nama_pemilik || !telp) {
      return res.status(400).json({ message: "Data stan tidak lengkap" });
    }

    const existingStan = await prisma.stan.findUnique({
      where: { id_user: req.user.id_user }
    });

    if (existingStan) {
      return res.status(400).json({ message: "User sudah punya stan" });
    }

    const stan = await prisma.stan.create({
      data: {
        nama_stan,
        nama_pemilik,
        telp: String(telp),   
        id_user: req.user.id_user
      }
    });

    res.status(201).json({ success: true, data: stan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



export const getAllStan = async (req, res) => {
  try {
    const data = await prisma.stan.findMany({
      include: { user: true, transaksi: true }
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStanById = async (req, res) => {
  try {
    const { id } = req.params;
    const stan = await prisma.stan.findUnique({
      where: { id_stan: Number(id) },
      include: { user: true, transaksi: true }
    });

    if (!stan) return res.status(404).json({ message: "Stan tidak ditemukan" });

    res.json({ success: true, data: stan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStan = async (req, res) => {
  try {
        const {nama_stan, nama_pemilik, telp} = req.body
        const result = await prisma.stan.update({
            data:{
                nama_stan : nama_stan,
                nama_pemilik : nama_pemilik,
                telp : telp 
            }
        })
        res.status(200).json({
            success: true, 
            data : result
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: MessageChannel.error
        })   
    }
};

export const deleteStan = async (req, res) => {
  try {
    const { id } = req.params;

    const stan = await prisma.stan.findUnique({
      where: { id_stan: Number(id) }
    });

    if (!stan) return res.status(404).json({ message: "Stan tidak ditemukan" });
    if (stan.id_user !== req.user.id_user) {
      return res.status(403).json({ message: "Tidak punya akses untuk menghapus Stan ini" });
    }

    await prisma.stan.delete({ where: { id_stan: Number(id) } });

    res.json({ success: true, message: "Stan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
