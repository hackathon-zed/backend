import "reflect-metadata";
import express, { Application as ExpressApplication, NextFunction } from "express";
import { RoutingControllersOptions, useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import path from "path";
import { configureSwagger } from "./infra/swagger/swagger";
import { enviroment } from "./infra/enviroment";
import passport from "passport";
import session from "express-session";
import { PassportConfig } from "./infra/auth/passport/passport.config";

export default class Application {
  readonly expressApp: ExpressApplication;

  constructor() {
    this.expressApp = express();

    this.configureMiddleware();
    this.configureErrorHandling();
    this.configureRouting();
    this.startServer();
  }

  private configureMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));

    // Configure session
    this.expressApp.use(session({
      saveUninitialized: false,
      resave: false,
      secret: enviroment.sessionSecret || "default",
      cookie: {
        secure: enviroment.production,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }));

    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
    Container.get(PassportConfig);
  }

  private configureErrorHandling() {
    this.expressApp.use((error: any, req: any, res: any, next: NextFunction) => {
      if (error instanceof Error) {
        console.error("Error in request", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: "An unknown error occurred",
      });
    });
  }

  private configureRouting() {
    const routingControllersOptions: RoutingControllersOptions = {
      routePrefix: "/api/v1",
      cors: {
        origin: enviroment.corsOrigin,
        credentials: true
      },
      controllers: [
        path.join(__dirname, "/ports/controllers/*.{ts,js}"),
        path.join(__dirname, "/ports/controllers/*/**/***.{ts,js}"),
      ],
      middlewares: [path.join(__dirname, "/ports/middlewares/*.{ts,js}")],
      interceptors: [path.join(__dirname, "/ports/interceptors/*.{ts,js}")],
      validation: true,
      defaultErrorHandler: false,
      development: enviroment.development,
    };

    this.configureContainer();
    useExpressServer(this.expressApp, routingControllersOptions);

    // Configure Swagger
    configureSwagger(this.expressApp, routingControllersOptions);
  }

  private startServer() {
    this.expressApp.listen(enviroment.port, () => {
      console.log(`Server running on port http://localhost:${enviroment.port}/api/v1/test`);
    });
  }

  configureContainer() {
    useContainer(Container);
  }
}