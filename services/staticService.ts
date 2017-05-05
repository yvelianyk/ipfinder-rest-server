import * as express from 'express';
import * as fs from 'fs';
import { config } from '../config';

export class StaticService{

    /*
    * This method provide serving static client files,
    * and handling angular 2 request
    **/
    // static init(app: express.Application): void {
    //     app.use('/', function(req, res, next) {
    //         if (fs.existsSync(config.CLIENT_APP_DIR)) {
    //             next();
    //         } else {
    //             res.status(500).send('The client folder is missing');
    //         }
    //     }, express.static(config.CLIENT_APP_DIR));
    //
    //     app.get('/*',  function(req, res, next) {
    //         res.sendFile('index.html', { root: config.CLIENT_APP_DIR });
    //     });
    // }
}