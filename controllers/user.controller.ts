import * as _ from 'underscore';
import { users, IUser } from '../models/users';
import { AccessRoles } from '../services/ac.service';

export class UserController {

    static findOrCreate(user: IUser): void {
        let foundUser: IUser;
        users.forEach((userItem, index)=>{
            if(userItem.id === user.id || userItem.email === user.email) {
                users[index].token = user.token;
                foundUser = userItem;
            }
        });
        if (!foundUser) {
            user.access = AccessRoles.USER;
            users.push(user);
        }
    }

    static updateUserToken(user: IUser): void {
        users.forEach((userItem, index) => {
            if (userItem.email === user.email) {
                users[index].token = user.token;
            }
        });
    }

    static getAll(): IUser[] {
        return users;
    }

    static findByEmail(email: string): IUser {
        return _.findWhere(users, {email: email});
    }
}