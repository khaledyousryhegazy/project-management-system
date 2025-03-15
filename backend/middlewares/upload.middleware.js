const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    const uniqueName = `user-${Date.now()}-${Math.round(
      Math.random() * 10000
    )}.${ext}`;

    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {
  const isImage = file.mimetype.split("/")[0];

  if (isImage === "image") {
    cb(null, true);
  } else {
    cb(new Error("file must be an image"), false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
