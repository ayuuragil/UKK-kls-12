import Joi from "joi";

/* ================= CREATE DISKON ================= */
const createDiskonSchema = Joi.object({
  namaDiskon: Joi.string().min(3).required(),
  persenDiskon: Joi.number()
    .min(1)
    .max(100)
    .required()
    .messages({
      "number.base": "Persen diskon harus berupa angka",
      "number.min": "Persen diskon minimal 1%",
      "number.max": "Persen diskon maksimal 100%",
    }),
  tanggalAwal: Joi.date().required(),
  tanggalAkhir: Joi.date()
    .greater(Joi.ref("tanggalAwal"))
    .required()
    .messages({
      "date.greater": "Tanggal akhir harus setelah tanggal awal",
    }),
});

const createDiskonValidation = (req, res, next) => {
  const { error } = createDiskonSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

/* ================= UPDATE DISKON ================= */
const updateDiskonSchema = Joi.object({
  namaDiskon: Joi.string().min(3).optional(),
  persenDiskon: Joi.number().min(1).max(100).optional(),
  tanggalAwal: Joi.date().optional(),
  tanggalAkhir: Joi.date()
    .greater(Joi.ref("tanggalAwal"))
    .optional()
    .messages({
      "date.greater": "Tanggal akhir harus setelah tanggal awal",
    }),
});

const updateDiskonValidation = (req, res, next) => {
  const { error } = updateDiskonSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

/* ================= CREATE MENU DISKON ================= */
const createMenuDiskonSchema = Joi.object({
  menuId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "menuId harus berupa angka",
      "number.positive": "menuId harus lebih dari 0",
      "any.required": "menuId wajib diisi",
    }),

  diskonId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "diskonId harus berupa angka",
      "number.positive": "diskonId harus lebih dari 0",
      "any.required": "diskonId wajib diisi",
    }),
});

const createMenuDiskonValidation = (req, res, next) => {
  const { error } = createMenuDiskonSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

/* ================= UPDATE MENU DISKON ================= */
const updateMenuDiskonSchema = Joi.object({
  menuId: Joi.number().integer().positive().optional(),
  diskonId: Joi.number().integer().positive().optional(),
})
  .min(1)
  .messages({
    "object.min": "Minimal salah satu field (menuId atau diskonId) harus diisi",
  });

const updateMenuDiskonValidation = (req, res, next) => {
  const { error } = updateMenuDiskonSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

export {
  createDiskonValidation,
  updateDiskonValidation,
  createMenuDiskonValidation,
  updateMenuDiskonValidation,
}
