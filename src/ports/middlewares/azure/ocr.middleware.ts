import { ExpressMiddlewareInterface, UnauthorizedError } from "routing-controllers";
import { Service } from "typedi";

// create a middleware to use multer to upload files
@Service()
export class OcrMiddleware implements ExpressMiddlewareInterface {
    use(req: any, res: any, next: (err?: any) => any): any {
        //    create multer middleware to upload files
        const multer = require('multer');
        const upload = multer(
            {
                storage: multer.memoryStorage(),
                limits: {
                    fileSize: 5 * 1024 * 1024 // 5MB file size limit
                }
            }
        );
        upload.single('image')(req, res, (err: any) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error uploading file" });
            }
            next();
        });
    }
}