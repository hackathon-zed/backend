import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import * as swaggerUiExpress from "swagger-ui-express";
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from "routing-controllers";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

import { routingControllersToSpec } from "routing-controllers-openapi";
import { Application as ExpressApplication } from "express";

export function configureSwagger(
  app: ExpressApplication,
  options: RoutingControllersOptions,
) {
  const storage = getMetadataArgsStorage();
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: "#/components/schemas/",
  }) as any;
  const spec = routingControllersToSpec(storage, options, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          scheme: "bearer",
          type: "http",
          bearerFormat: "JWT",
        },
      },
    },
    info: { title: "hackathon", version: "0.0.1" },
  });
  app.use("/swagger", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
}
