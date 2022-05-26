import multer from 'multer';
/** Storage Engine */
var storage = multer.diskStorage({});

//init

var validateFile = function (file: any, cb: any) {
    let allowedFileTypes = /jpeg|jpg|png/;
    const extension = allowedFileTypes.test(
        // @ts-ignore
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb('Invalid file type. Only JPEG, PNG file are allowed.');
    }
};

const uploader = multer({
    storage: storage,
    limits: { fileSize: 800000 },
    fileFilter: function (req, file, callback) {
        validateFile(file, callback);
    },
});

export default uploader;
