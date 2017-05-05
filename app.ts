'use strict';

import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';

import { StaticService } from './services/staticService';
import { routes } from "./routes";
import * as handlers from "./handlers";

const app: express.Application = express();
const router: express.Router = express.Router();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// ============================================================================================
// Initialization of routes
// ============================================================================================
routes.forEach((route) => {
    let callbacks = [];
    // Wrap each route handler to perform access control:
    callbacks.push((req: express.Request, res: express.Response, next) => {
        handlers[route.handler](req, res, next);
    });
    router[route.method](route.path, callbacks);
});

app.use(router);

// ============================================================================================
// This section of code for providing serving of static client files
// ============================================================================================
//StaticService.init(app);

export { app }
