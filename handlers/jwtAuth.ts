import * as jwt from 'jwt-simple';
import { config } from '../config';
import { UserController } from '../controllers/user.controller';

const jwtAuth = function(req, res){
    if (!(req.body.email && req.body.password)) {
        res.sendStatus(401);
    }
    let token: string = jwt.encode(UserController.findByEmail(req.body.email), config.jwt.secret);
    UserController.updateUserToken({
        email: req.body.email,
        token: token
    });
    res.json({token: token});
};

export { jwtAuth }