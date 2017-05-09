import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';

import { AuthService } from './services/auth.service';
import { RouterService } from './services/router.service';

const app: express.Application = express();
const auth = new AuthService();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// ============================================================================================
// Auth init
// ============================================================================================
auth.init();

// ============================================================================================
// Initialization of routes
// ============================================================================================
RouterService.init(app);

export { app }
