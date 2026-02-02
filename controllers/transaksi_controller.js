import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* =========================
   CREATE TRANSAKSI (SISWA)
========================= */
export const createTransaksi = async (req, res) => {
  try {
    const { id_stan, detail } = req.body;
    /**
     * detail contoh:
     * [
     *   { id_menu: 1, harga: 10000, qty: 2 },
     *   { id_menu: 3, harga: 5000, qty: 1 }
     * ]
     */

    if (!detail || detail.length === 0) {
      return res.status(400).json({ message: "Detail transaksi kosong" });
    }

    const transaksi = await prisma.transaksi.create({
      data: {
        tgl_transaksi: new Date(),
        nama_pelanggan: req.user.username,
        status: false,
        id_user: req.user.id_user,
        id_stan: Number(id_stan),
        detail_transaksi: {
          create: detail.map(item => ({
            id_menu: item.id_menu,
            harga: item.harga,
            qty: item.qty
          }))
        }
      },
      include: {
        detail_transaksi: true
      }
    });

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat",
      data: transaksi
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET TRANSAKSI SISWA
========================= */
export const getTransaksiSiswa = async (req, res) => {
  try {
    const data = await prisma.transaksi.findMany({
      where: {
        id_user: req.user.id_user
      },
      include: {
        detail_transaksi: {
          include: {
            menu: true
          }
        },
        stan: true
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET TRANSAKSI STAN
========================= */
export const getTransaksiStan = async (req, res) => {
  try {
    const stan = await prisma.stan.findFirst({
      where: {
        id_user: req.user.id_user
      }
    });

    if (!stan) {
      return res.status(404).json({ message: "Stan tidak ditemukan" });
    }

    const data = await prisma.transaksi.findMany({
      where: {
        id_stan: stan.id_stan
      },
      include: {
        detail_transaksi: {
          include: {
            menu: true
          }
        },
        user: true
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   KONFIRMASI TRANSAKSI (STAN)
========================= */
export const konfirmasiTransaksi = async (req, res) => {
  try {
    const { id } = req.params;

    const transaksi = await prisma.transaksi.update({
      where: {
        id_transaksi: Number(id)
      },
      data: {
        status: true
      }
    });

    res.json({
      success: true,
      message: "Transaksi dikonfirmasi",
      data: transaksi
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
