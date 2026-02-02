import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// CREATE MENU
export const createMenu = async (req, res) => {
  try {
    const { nama, harga, jenis, deskripsi } = req.body

    // ambil stan milik user login
    const stan = await prisma.stan.findFirst({
      where: { userId: req.user.id }
    })

    if (!stan) {
      return res.status(404).json({
        success: false,
        message: "Stan tidak ditemukan"
      })
    }

    const menu = await prisma.menu.create({
      data: {
        nama: nama,
        harga: harga,
        jenis: jenis, // MAKANAN / MINUMAN
        deskripsi: deskripsi,
        stanId: stan.id
      }
    })

    res.status(201).json({
      success: true,
      data: menu
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// GET MENU BY STAN LOGIN
export const getMenuByStan = async (req, res) => {
  try {
    const stan = await prisma.stan.findFirst({
      where: { userId: req.user.id }
    })

    const menu = await prisma.menu.findMany({
      where: { stanId: stan.id }
    })

    res.json({
      success: true,
      data: menu
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// UPDATE MENU
export const updateMenu = async (req, res) => {
  try {
    const { nama, harga, jenis, deskripsi } = req.body

    const menu = await prisma.menu.update({
      where: { id: Number(req.params.id) },
      data: {
        nama,
        harga,
        jenis,
        deskripsi
      }
    })

    res.json({
      success: true,
      data: menu
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// DELETE MENU
export const deleteMenu = async (req, res) => {
  try {
    await prisma.menu.delete({
      where: { id: Number(req.params.id) }
    })

    res.json({
      success: true,
      message: "Menu berhasil dihapus"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
