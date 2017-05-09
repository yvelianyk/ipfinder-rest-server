/**
 * Access control service
 */
import { IUser } from '../models/users';

export const enum AccessRoles {
    ANY,
    USER,
    ADMIN
}

export class ACService {
    static check(access: AccessRoles, user: IUser ): boolean {
        return access === AccessRoles.ANY ? true : user.access >= access;
    }
}