import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
    use(req: any, res: any, next: (err?: any) => any): any {
        console.log("Auth middleware", req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
        throw new UnauthorizedError("Unauthorized");
    }
}