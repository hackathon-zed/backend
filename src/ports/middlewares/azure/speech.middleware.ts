
import { ExpressErrorMiddlewareInterface } from "routing-controllers";
import multer from "multer";
import { Service } from "typedi";


@Service()
export class SpeechUploadFileMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, req: any, res: any, next: (err: any) => any): void {
        if (error instanceof multer.MulterError) {
            res.status(400).json({ message: "File too large" });
        } else {
            next(error);
        }
    }

    use(req: any, res: any, next: (err?: any) => any): any {
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 5 * 1024 * 1024 // 5MB file size limit
            }
        });
        upload.single('audio')(req, res, (err: any) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error uploading file" });
            }
            next();
        });
    }

}