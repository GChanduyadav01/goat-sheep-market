const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpg|jpeg|png|webp/;
  const isExtensionValid = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const isMimetypeValid = allowedExtensions.test(file.mimetype);

  if (isExtensionValid && isMimetypeValid) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload jpg, jpeg, png, or webp only.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;
