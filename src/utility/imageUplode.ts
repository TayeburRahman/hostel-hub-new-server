import { NextFunction, Request, Response } from 'express';

export const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No Image on form data' });
    }

    if (req.files.image) {
        const body = req.body;
        const file = req.files.image;
        //@ts-ignore
        const upload = await cloudinary.uploader.upload(file.tempFilePath);
        body.image = upload.public_id;
        console.log(body);
    }

    next();
};
