import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

/* =======================
   FITUR SISWA
======================= */

// Register Siswa
const createSiswa = async (req, res) => {
  try {
    const { username, password, namaSiswa, alamat, telp } = req.body;

    const findUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (findUsername) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const newSiswa = await prisma.siswa.create({
      data: {
        namaSiswa,
        alamat,
        telp,
        userId: newUser.id,
      },
    });

    res.status(201).json({
      message: "Siswa berhasil dibuat",
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
        siswa: newSiswa,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Update Siswa
const updateSiswa = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const findSiswa = await prisma.siswa.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!findSiswa) {
      return res.status(404).json({ message: "Profil siswa tidak ditemukan" });
    }

    const { namaSiswa, alamat, telp, username, password } = req.body;

    if (username && username !== findSiswa.user.username) {
      const exists = await prisma.user.findUnique({ where: { username } });
      if (exists) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }
    }

    if (req.file && findSiswa.foto) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        "userImage",
        findSiswa.foto
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username ?? findSiswa.user.username,
        password: hashedPassword ?? findSiswa.user.password,
      },
    });

    const updatedSiswa = await prisma.siswa.update({
      where: { userId },
      data: {
        namaSiswa: namaSiswa ?? findSiswa.namaSiswa,
        alamat: alamat ?? findSiswa.alamat,
        telp: telp ?? findSiswa.telp,
        foto: req.file ? req.file.filename : findSiswa.foto,
      },
    });

    res.status(200).json({
      message: "Profil siswa berhasil diperbarui",
      data: {
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          role: updatedUser.role,
        },
        siswa: updatedSiswa,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Profile Siswa
const getProfileSiswa = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        siswa: true,
        createdAt: true,
      },
    });

    if (!user || !user.siswa) {
      return res.status(404).json({ message: "Profil siswa tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mengambil profil",
      data: user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login (Siswa & Stan)
const authentication = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await prisma.user.findUnique({ where: { username } });
    if (!findUser) {
      return res.status(200).json({ message: "Username tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Username atau Password yang anda masukkan salah",
      });
    }

    const secret = process.env.SECRET;
    if (!secret) throw new Error("JWT secret belum diset");

    const token = jwt.sign(
      {
        id: findUser.id,
        username: findUser.username,
        role: findUser.role,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login berhasil",
      data: {
        logged: true,
        token,
        id: findUser.id,
        username: findUser.username,
        role: findUser.role,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =======================
   FITUR STAN
======================= */

const createStan = async (req, res) => {
  try {
    const { username, password, namaStan, namaPemilik, telp } = req.body;

    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "ADMIN_STAN",
      },
    });

    const newStan = await prisma.stan.create({
      data: {
        namaStan,
        namaPemilik,
        telp,
        foto: req.file ? req.file.filename : null,
        userId: newUser.id,
      },
    });

    res.status(201).json({
      message: "Stan berhasil dibuat",
      data: {
        user: newUser,
        stan: newStan,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateStan = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const findStan = await prisma.stan.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!findStan) {
      return res.status(404).json({ message: "Profil stan tidak ditemukan" });
    }

    const { namaStan, namaPemilik, telp, username, password } = req.body;

    if (username && username !== findStan.user.username) {
      const exists = await prisma.user.findUnique({ where: { username } });
      if (exists) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }
    }

    if (req.file && findStan.foto) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        "userImage",
        findStan.foto
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username ?? findStan.user.username,
        password: hashedPassword ?? findStan.user.password,
      },
    });

    const updatedStan = await prisma.stan.update({
      where: { userId },
      data: {
        namaStan: namaStan ?? findStan.namaStan,
        namaPemilik: namaPemilik ?? findStan.namaPemilik,
        telp: telp ?? findStan.telp,
        foto: req.file ? req.file.filename : findStan.foto,
      },
    });

    res.status(200).json({
      message: "Profil stan berhasil diperbarui",
      data: {
        user: updatedUser,
        stan: updatedStan,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProfileStan = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        stan: true,
        createdAt: true,
      },
    });

    if (!user || !user.stan) {
      return res.status(404).json({ message: "Profil stan tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mengambil profil stan",
      data: user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =======================
   EXPORT
======================= */

export {
  createSiswa,
  authentication,
  getProfileSiswa,
  updateSiswa,
  createStan,
  updateStan,
  getProfileStan,
};
