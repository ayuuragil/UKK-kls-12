import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDiskon = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { namaDiskon, persenDiskon, tanggalAwal, tanggalAkhir } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(403).json({
        message: "Akses ditolak (bukan admin stan)",
      });
    }

    if (new Date(tanggalAwal) >= new Date(tanggalAkhir)) {
      return res.status(400).json({
        message: "Tanggal akhir harus setelah tanggal awal",
      });
    }

    const diskon = await prisma.diskon.create({
      data: {
        namaDiskon,
        persenDiskon,
        tanggalAwal: new Date(tanggalAwal),
        tanggalAkhir: new Date(tanggalAkhir),
        stanId: stan.id,
      },
    });

    res.status(201).json({
      message: "Diskon berhasil dibuat",
      data: diskon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDiskon = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(403).json({
        message: "Akses ditolak (bukan admin stan)",
      });
    }

    const diskon = await prisma.diskon.findMany({
      where: { stanId: stan.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: "Berhasil mengambil semua diskon stan",
      data: diskon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDiskonById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const diskonId = Number(req.params.id);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (isNaN(diskonId)) {
      return res.status(400).json({ message: "ID diskon tidak valid" });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(403).json({
        message: "Akses ditolak (bukan admin stan)",
      });
    }

    const diskon = await prisma.diskon.findFirst({
      where: {
        id: diskonId,
        stanId: stan.id,
      },
      include: {
        menuDiskon: {
          include: {
            menu: {
              select: {
                id: true,
                namaMakanan: true,
                harga: true,
                jenis: true,
              },
            },
          },
        },
      },
    });

    if (!diskon) {
      return res.status(404).json({
        message: "Diskon tidak ditemukan atau bukan milik stan ini",
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil detail diskon",
      data: diskon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDiskon = async (req, res) => {
  try {
    const userId = req.user?.id;
    const diskonId = Number(req.params.id);
    const { namaDiskon, persenDiskon, tanggalAwal, tanggalAkhir } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (isNaN(diskonId)) {
      return res.status(400).json({ message: "ID diskon tidak valid" });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(403).json({
        message: "Akses ditolak (bukan admin stan)",
      });
    }

    const findDiskon = await prisma.diskon.findFirst({
      where: {
        id: diskonId,
        stanId: stan.id,
      },
    });

    if (!findDiskon) {
      return res.status(404).json({
        message: "Diskon tidak ditemukan atau bukan milik stan ini",
      });
    }

    if (tanggalAwal && tanggalAkhir) {
      if (new Date(tanggalAwal) >= new Date(tanggalAkhir)) {
        return res.status(400).json({
          message: "Tanggal akhir harus setelah tanggal awal",
        });
      }
    }

    const updatedDiskon = await prisma.diskon.update({
      where: { id: findDiskon.id },
      data: {
        namaDiskon: namaDiskon ?? findDiskon.namaDiskon,
        persenDiskon:
          persenDiskon !== undefined
            ? Number(persenDiskon)
            : findDiskon.persenDiskon,
        tanggalAwal: tanggalAwal
          ? new Date(tanggalAwal)
          : findDiskon.tanggalAwal,
        tanggalAkhir: tanggalAkhir
          ? new Date(tanggalAkhir)
          : findDiskon.tanggalAkhir,
      },
    });

    res.status(200).json({
      message: "Diskon berhasil diperbarui",
      data: updatedDiskon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= MENU DISKON ================= */

export const createMenuDiskon = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { menuId, diskonId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!menuId || !diskonId) {
      return res.status(400).json({
        message: "menuId dan diskonId wajib diisi",
      });
    }

    const stan = await prisma.stan.findUnique({
      where: { userId },
    });

    if (!stan) {
      return res.status(403).json({
        message: "Akses ditolak (bukan admin stan)",
      });
    }

    const menu = await prisma.menu.findFirst({
      where: { id: Number(menuId), stanId: stan.id },
    });

    if (!menu) {
      return res.status(404).json({
        message: "Menu tidak ditemukan atau bukan milik stan ini",
      });
    }

    const diskon = await prisma.diskon.findFirst({
      where: { id: Number(diskonId), stanId: stan.id },
    });

    if (!diskon) {
      return res.status(404).json({
        message: "Diskon tidak ditemukan atau bukan milik stan ini",
      });
    }

    const exists = await prisma.menuDiskon.findFirst({
      where: { menuId: menu.id, diskonId: diskon.id },
    });

    if (exists) {
      return res.status(400).json({
        message: "Diskon sudah diterapkan pada menu ini",
      });
    }

    const menuDiskon = await prisma.menuDiskon.create({
      data: {
        menuId: menu.id,
        diskonId: diskon.id,
      },
    });

    res.status(201).json({
      message: "Diskon berhasil ditambahkan ke menu",
      data: menuDiskon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
