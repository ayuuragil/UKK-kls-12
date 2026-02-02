import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

/* =====================
   CREATE MENU
===================== */
const createMenu = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    const { namaMakanan, harga, jenis, deskripsi } = req.body;

    const menu = await prisma.menu.create({
      data: {
        namaMakanan,
        harga: Number(harga),
        jenis,
        deskripsi,
        foto: req.file.filename,
        stanId: stan.id,
      },
    });

    res.status(201).json({
      message: "Menu berhasil ditambahkan",
      data: menu,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =====================
   GET MENU STAN
===================== */
const getMenuStan = async (req, res) => {
  try {
    const userId = req.user?.id;

    const stan = await prisma.stan.findUnique({
      where: { userId },
      include: { menu: true },
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mengambil menu",
      data: stan.menu,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =====================
   UPDATE MENU
===================== */
const updateMenu = async (req, res) => {
  try {
    const userId = req.user?.id;
    const id = Number(req.params.id);

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    const menu = await prisma.menu.findFirst({
      where: { id },
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    // hapus foto lama
    if (req.file && menu.foto) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        "menuImage",
        menu.foto
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        namaMakanan: req.body.namaMakanan ?? menu.namaMakanan,
        harga: req.body.harga ? Number(req.body.harga) : menu.harga,
        jenis: req.body.jenis ?? menu.jenis,
        deskripsi: req.body.deskripsi ?? menu.deskripsi,
        foto: req.file ? req.file.filename : menu.foto,
      },
    });

    res.status(200).json({
      message: "Menu berhasil diperbarui",
      data: updatedMenu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

/* =====================
   DELETE MENU
===================== */
const deleteMenu = async (req, res) => {
  try {
    const userId = req.user?.id;
    const id = Number(req.params.id);

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    const menu = await prisma.menu.findFirst({
      where: { id, stanId: stan.id },
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    if (menu.foto) {
      const pathFile = path.join(
        process.cwd(),
        "public",
        "menuImage",
        menu.foto
      );
      if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }

    await prisma.menu.delete({ where: { id } });

    res.status(200).json({
      message: "Menu berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =====================
   MENU DISKON
===================== */
const getMenuDiskonAll = async (req, res) => {
  try {
    const data = await prisma.menu.findMany({
      where: {
        menuDiskon: {
          some: {},
        },
      },
      include: {
        menuDiskon: {
          include: { diskon: true },
        },
        stan: {
          select: {
            id: true,
            namaStan: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil menu yang memiliki diskon",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =====================
   FILTER MENU
===================== */
const getMenuMakanan = async (req, res) => {
  try {
    const data = await prisma.menu.findMany({
      where: { jenis: "MAKANAN" },
      include: {
        menuDiskon: { include: { diskon: true } },
        stan: { select: { id: true, namaStan: true } },
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil menu makanan",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMenuMinuman = async (req, res) => {
  try {
    const data = await prisma.menu.findMany({
      where: { jenis: "MINUMAN" },
      include: {
        menuDiskon: { include: { diskon: true } },
        stan: { select: { id: true, namaStan: true } },
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil menu minuman",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* =====================
   GET ALL MENU + SEARCH
===================== */
const getMenuAll = async (req, res) => {
  try {
    const q = req.query.q;
    const now = new Date();

    const data = await prisma.menu.findMany({
      where: q
        ? {
            OR: [
              { namaMakanan: { contains: q } },
              { stan: { namaStan: { contains: q } } },
            ],
          }
        : undefined,
      include: {
        stan: { select: { id: true, namaStan: true } },
        menuDiskon: {
          where: {
            diskon: {
              tanggalAwal: { lte: now },
              tanggalAkhir: { gte: now },
            },
          },
          include: { diskon: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: q
        ? `Berhasil mencari menu dengan kata kunci "${q}"`
        : "Berhasil mengambil semua menu",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

/* =====================
   MENU BY STAN ID
===================== */
const getMenuByStanId = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID user tidak valid" });
    }

    const stan = await prisma.stan.findUnique({
      where: { stanId: userId },
      include: {
        menu: {
          include: {
            menuDiskon: { include: { diskon: true } },
          },
        },
      },
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mengambil menu",
      data: stan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

/* =====================
   ALL STAN WITH MENU
===================== */
const getAllStanWithMenus = async (req, res) => {
  try {
    const q = req.query.q;

    const stans = await prisma.stan.findMany({
      where: q
        ? {
            OR: [
              { namaStan: { contains: q } },
              {
                menu: {
                  some: { namaMakanan: { contains: q } },
                },
              },
            ],
          }
        : undefined,
      include: {
        menu: {
          where: q ? { namaMakanan: { contains: q } } : undefined,
          include: {
            menuDiskon: { include: { diskon: true } },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua stan",
      data: stans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

/* =====================
   SEARCH MENU
===================== */
const searchMenu = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Query pencarian (q) wajib diisi",
      });
    }

    const where = {
      OR: [
        { namaMakanan: { contains: String(q) } },
        { stan: { namaStan: { contains: String(q) } } },
      ],
    };

    const data = await prisma.menu.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        stan: { select: { id: true, namaStan: true } },
        menuDiskon: { include: { diskon: true } },
      },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mencari menu",
      data,
    });
  } catch (error) {
    console.error("Search menu error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mencari menu",
    });
  }
};

const getMenuDiskonByMenuId = async (req, res) => {
  try {
    const userId = req.user?.id;
    const menuId = Number(req.params.menuId);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // ambil stan dari user
    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      res.status(403).json({ message: "Akses ditolak (bukan admin stan)" });
      return;
    }

    // ambil menu + validasi kepemilikan stan
    const menu = await prisma.menu.findFirst({
      where: {
        id: menuId,
        stanId: stan.id,
      },
      include: {
        menuDiskon: {
          include: {
            diskon: true,
          },
        },
      },
    });

    if (!menu || menu.menuDiskon.length === 0) {
      res.status(404).json({ message: "Menu diskon tidak ditemukan" });
      return;
    }

    res.status(200).json({
      message: "Berhasil mengambil detail menu diskon",
      data: menu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMenuDiskon = async (req, res) => {
  try {
    const userId = req.user?.id;
    const id = Number(req.params.id);
    const { menuId, diskonId } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Ambil stan dari user
    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      res.status(403).json({ message: "Akses ditolak (bukan admin stan)" });
      return;
    }

    // Cari menuDiskon + relasi
    const find = await prisma.menuDiskon.findUnique({
      where: { id },
      include: {
        menu: true,
        diskon: true,
      },
    });

    if (!find) {
      res.status(404).json({ message: "MenuDiskon tidak ditemukan" });
      return;
    }

    // pastikan menuDiskon milik stan ini
    if (
      find.menu.stanId !== stan.id ||
      find.diskon.stanId !== stan.id
    ) {
      res.status(403).json({
        message: "Tidak berhak mengubah menu diskon stan lain",
      });
      return;
    }

    let finalMenuId = find.menuId;
    let finalDiskonId = find.diskonId;

    // Validasi menu baru
    if (menuId) {
      const menu = await prisma.menu.findFirst({
        where: {
          id: Number(menuId),
          stanId: stan.id,
        },
      });

      if (!menu) {
        res.status(404).json({
          message: "Menu tidak ditemukan atau bukan milik stan ini",
        });
        return;
      }

      finalMenuId = Number(menuId);
    }

    // Validasi diskon baru
    if (diskonId) {
      const diskon = await prisma.diskon.findFirst({
        where: {
          id: Number(diskonId),
          stanId: stan.id,
        },
      });

      if (!diskon) {
        res.status(404).json({
          message: "Diskon tidak ditemukan atau bukan milik stan ini",
        });
        return;
      }

      finalDiskonId = Number(diskonId);
    }

    // Cegah duplikasi
    const exists = await prisma.menuDiskon.findFirst({
      where: {
        menuId: finalMenuId,
        diskonId: finalDiskonId,
        NOT: { id },
      },
    });

    if (exists) {
      res.status(400).json({
        message: "Menu sudah memiliki diskon tersebut",
      });
      return;
    }

    // Update
    const updated = await prisma.menuDiskon.update({
      where: { id },
      data: {
        menuId: finalMenuId,
        diskonId: finalDiskonId,
      },
    });

    res.status(200).json({
      message: "Menu diskon berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =====================
   EXPORT
===================== */
export {
  createMenu,
  getMenuStan,
  updateMenu,
  deleteMenu,
  getMenuDiskonAll,
  getMenuMakanan,
  getMenuMinuman,
  getMenuAll,
  getMenuByStanId,
  getAllStanWithMenus,
  searchMenu,
  getMenuDiskonByMenuId,
  updateMenuDiskon,
};
