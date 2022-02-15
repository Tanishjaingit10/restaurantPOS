const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.DATABASE;

// Create storage engine
const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    originalname: file.originalname,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

module.exports = { upload };
