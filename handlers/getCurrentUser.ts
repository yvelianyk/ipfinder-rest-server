import { Response, Request } from "express";
import { IUser } from '../models/users';
import * as _ from 'underscore';

interface RequestWithUser extends Request {
    user: string;
}

const getCurrentUser = function(request: RequestWithUser, response: Response){
    let currentUser: IUser  = request.user;
    currentUser.connected = true;
    response.json(_.pick(currentUser, 'name', 'email', 'avatar', 'connected'));
};

export { getCurrentUser }