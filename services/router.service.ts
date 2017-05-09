import * as express from 'express';
import { routes } from "../routes";
import * as handlers from "../handlers";
import { AuthService } from './auth.service';
import { ACService, AccessRoles } from './ac.service';

const router: express.Router = express.Router();
const auth = new AuthService();

export class RouterService {
    static init(app: express.Application): void {
        routes.forEach((route) => {
            let callbacks = [];
            // Wrap each route handler to perform access control:
            callbacks.push((req, res, next) => {
                if (ACService.check(route.access, req.user)) {
                    handlers[route.handler](req, res, next);
                } else {
                    res.status(403).send('Forbidden');
                }
            });
            // Check is user authenticated, if access level is not 'ANY'
            route.access === AccessRoles.ANY ?
                router[route.method](route.path, callbacks) :
                router[route.method](route.path, auth.ensureAuthenticated, callbacks);

        });

        app.use(router);
    }
}