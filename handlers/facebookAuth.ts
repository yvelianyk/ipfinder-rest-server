import { Response, Request } from "express";
import * as passport from 'passport';
import { UserController } from '../controllers/user.controller';

const facebookAuth = function(req: Request, res: Response, next){
    passport.authenticate('facebook-token', function (err, user) {
        if (err || !user) {
            return res.status(403).send('Forbidden');
        }
        UserController.findOrCreate({
            id: user.id,
            token: user.token
        });
        res.json({success: true});
    })(req, res, next);
};

export { facebookAuth }