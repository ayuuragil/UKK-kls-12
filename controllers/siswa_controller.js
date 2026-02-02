import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const registerSiswa = async (req, res) => {
  try {
    const {
      nama_siswa,
      alamat,
      telp,
      username,
      password
    } = req.body;

    const foto = req.file?.filename;

    if (!nama_siswa || !username || !password || !foto) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const user = await prisma.user.create({
      data: {
        name_user: nama_siswa,
        username,
        password: md5(password),
        role: "siswa"
      }
    });

    const siswa = await prisma.siswa.create({
      data: {
        id_user: user.id_user,
        nama_siswa,
        alamat,
        telp: Number(telp),
        foto
      }
    });

    res.status(201).json({
      message: "Register siswa berhasil",
      siswa
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSiswa = async (req, res) => {
  try {
    const data = await prisma.siswa.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSiswaById = async (req, res) => {
  try {
    const { id } = req.params;

    const siswa = await prisma.siswa.findUnique({
      where: {
        id_siswa: Number(id)
      }
    });

    res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const siswa = await prisma.siswa.update({
      where: {
        id_siswa: Number(id)
      },
      data: req.body
    });

    res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.siswa.delete({
      where: {
        id_siswa: Number(id)
      }
    });

    res.json({ message: "Siswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};