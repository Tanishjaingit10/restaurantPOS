const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

let gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
    // Init stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
});

const all_files = (req, res) => {
    gridfsBucket
        .find()
        .toArray()
        .then((files) => {
            if (!files || files.length === 0)
                return res.status(404).json({ message: "No files found" });
            else {
                files.map((file) => {
                    if (
                        file.contentType === "image/jpeg" ||
                        file.contentType === "image/png"
                    )
                        file.isImage = true;
                    else file.isImage = false;
                });
                res.json(files);
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "Error Fetching Files" })
        );
};

const upload_file = (req, res) => {
    res.json(req.file.id);
};

const single_file = (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    gridfsBucket
        .find({ _id: ObjectId(req.params.id) })
        .next()
        .then((file) => {
            if (!file)
                return res.status(404).json({
                    message: "No file exists",
                });
            else return res.json(file);
        })
        .catch((err) =>
            res.status(404).json({
                message: "Error Fetching File",
            })
        );
};

const display_image = (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    gridfsBucket
        .find({ _id: ObjectId(req.params.id) })
        .next()
        .then((file) => {
            if (!file)
                return res.status(404).json({
                    message: "No file exists",
                });
            if (
                file.contentType === "image/jpeg" ||
                file.contentType === "image/png"
            ) {
                const readstream = gridfsBucket.openDownloadStream(file._id);
                readstream.pipe(res);
            } else {
                return res.status(404).json({
                    message: "Not an image",
                });
            }
        })
        .catch((err) =>
            res.status(404).json({
                message: "Error Fetching File",
            })
        );
};

const delete_file = (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    gridfsBucket
        .find({ _id: ObjectId(req.params.id) })
        .next()
        .then((file) => {
            if (!file)
                return res.status(404).json({
                    message: "No file exists",
                });
            gridfsBucket
                .delete(file._id)
                .then((data) => res.json({ message: "File deleted", data }))
                .catch((err) => {});
        })
        .catch((err) =>
            res.status(404).json({
                message: "Error Fetching File",
            })
        );
};

module.exports = {
    all_files,
    upload_file,
    single_file,
    display_image,
    delete_file,
};
