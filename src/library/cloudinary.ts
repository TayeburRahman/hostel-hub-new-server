import cloudinary from 'cloudinary';
import 'dotenv/config';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_API_NAME } =
    process.env;

cloudinary.v2.config({
    cloud_name: CLOUDINARY_API_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;
