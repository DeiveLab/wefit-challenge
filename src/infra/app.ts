import './setup';
import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./http/routes";
import swaggerJson from '../docs/swagger.json';

export const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(routes);