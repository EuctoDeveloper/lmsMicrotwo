import upload from "../utils/saveFile.js";

const lessonUpload = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if(err) {
            logger.log('Failed to upload file', err);
            return res.status(500).json({ message: 'Failed to upload file' });
        }
        next();
    });

}
export default lessonUpload;