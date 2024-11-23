import "reflect-metadata";
import { Get, JsonController, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";

@Service()
@JsonController('/test')
export class TestController {


  @Get()
  async test(@Req() req: Request, @Res() res: any) {
    return res.send("Hello World");
  }

  @Get('/private')
  @UseBefore(AuthMiddleware)
  async authenticated(@Req() req: any, @Res() res: any) {
    return res.send("<h1>Authenticated ${req.user}</h1>");
  }
}