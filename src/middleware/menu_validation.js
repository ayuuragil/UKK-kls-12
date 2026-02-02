import Joi from "joi";
import fs from "fs";
import path from "path";

/**
 * hapus file upload kalau validasi gagal
 */
const deleteUploadedFile = (file) => {
  if (!file) return;

  const filePath = path.join(file.destination, file.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const createMenuSchema = Joi.object({
  namaMakanan: Joi.string().required(),
  harga: Joi.number().positive().required(),
  jenis: Joi.string().valid("MAKANAN", "MINUMAN").required(),
  deskripsi: Joi.string().allow("", null),
});

const createMenuValidation = (req, res, next) => {
  const { error } = createMenuSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    deleteUploadedFile(req.file);
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Foto menu wajib diupload",
    });
  }

  next();
};

const updateMenuSchema = Joi.object({
  namaMakanan: Joi.string().min(3).optional(),
  harga: Joi.number().positive().optional(),
  jenis: Joi.string().valid("MAKANAN", "MINUMAN").optional(),
  deskripsi: Joi.string().allow("", null).optional(),
});

const updateMenuValidation = (req, res, next) => {
  const { error } = updateMenuSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    deleteUploadedFile(req.file);
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  next();
};

export { createMenuValidation, updateMenuValidation };
