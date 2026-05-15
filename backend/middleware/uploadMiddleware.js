const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    cb(null, `${Date.now()}-${fileName}${fileExt}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
  }
};

const upload = multer({ storage: Storage, fileFilter });

module.exports = upload;
