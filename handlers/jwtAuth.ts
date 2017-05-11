import * as jwt from 'jwt-simple';
import {config} from '../config';
import {UserController} from '../controllers/user.controller';

const jwtAuth = function (req, res): void {
    let isPasswordInRequest = !!req.body.password;
    let isEmailInRequest = !!req.body.email;
    let user = UserController.findByEmail(req.body.email);
    let isUserExists = !!user;
    let isPasswordCorrect = user && user.password === req.body.password;

    if (!isEmailInRequest || !isPasswordInRequest || !isUserExists || !isPasswordCorrect) {
        res.sendStatus(401);
        return;
    }

    let token: string = jwt.encode(UserController.findByEmail(req.body.email), config.jwt.secret);
    UserController.updateUserToken({
        email: req.body.email,
        token: token
    });
    res.json({token: token});
};

export {jwtAuth}