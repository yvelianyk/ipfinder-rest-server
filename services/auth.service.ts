import { config } from '../config';
import { IUser } from '../models/users';
import { UserController } from '../controllers/user.controller';
import * as passport from 'passport';

const FacebookTokenStrategy = require('passport-facebook-token');
const PassportJWT = require('passport-jwt');
const ExtractJwt = PassportJWT.ExtractJwt;
const JWTStrategy = PassportJWT.Strategy;

export class AuthService {

    // --------------------------------------------------------------------------------------------
    // PUBLIC:
    // --------------------------------------------------------------------------------------------

    init(): void {
        passport.initialize();
        passport.use(this._jwtStrategy);
        passport.use(this._facebookStrategy);
        passport.serializeUser(this._serializeHandler);
        passport.deserializeUser(this._serializeHandler);
    }

    ensureAuthenticated(req, res, next): void {
        passport.authenticate(['jwt', 'facebook-token'], config.jwt.session, function (err, user) {
            if (err || !user) {
                return res.status(403).send('Forbidden');
            }
            req.user = user;
            next(null);
        })(req, res, next);
    }

    // --------------------------------------------------------------------------------------------
    // PRIVATE:
    // --------------------------------------------------------------------------------------------

    private _jwtStrategy = new JWTStrategy({
        secretOrKey: config.jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    }, function (user, done) {
        UserController.updateUserToken(user);
        return done(null, user);
    });

    private _facebookStrategy = new FacebookTokenStrategy(config.facebook,
        function (accessToken, refreshToken, profile, done) {
            let user: IUser = {
                'email': profile.emails[0].value,
                'name': profile.name.givenName + ' ' + profile.name.familyName,
                'id': profile.id,
                'token': accessToken
            };
            UserController.findOrCreate(user);
            return done(null, user);
        }
    );

    private _serializeHandler(user, done) {
        done(null, user);
    }

}