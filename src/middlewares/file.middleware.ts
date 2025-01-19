import { NextFunction, Request, Response } from "express";
import { ImageConfigType } from "../constants/image.constants"
import { UploadedFile } from "express-fileupload";
import { ApiError } from "../errors/apiError";

class FileMiddleware {
    public isFileValid(key: string, config: ImageConfigType) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const file = req.files?.[key] as UploadedFile;
                if (!file) {
                    throw new ApiError("File not found", 400);
                }
                if (!config.types.includes(file.mimetype)) {
                    throw new ApiError("Invalid file type", 400);
                }
                if (file.size > config.size) {
                    throw new ApiError("File is too large", 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const fileMiddleware = new FileMiddleware();