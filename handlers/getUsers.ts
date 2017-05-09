import { Response, Request } from "express";
import { UserController } from '../controllers/user.controller';

const getUsers = function(request: Request, response: Response){
    response.json(UserController.getAll());
};

export { getUsers }