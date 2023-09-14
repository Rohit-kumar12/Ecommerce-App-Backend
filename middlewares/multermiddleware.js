const multer = require("multer");

const mimeTypeMap = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let isValid = mimeTypeMap[file.mimetype];
    let error = new Error("Invalid mime Type");
    if (isValid) error = null;
    cb(error, "./public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const extension = mimeTypeMap[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage: storage }).single("photo");