import { AccessRoles } from '../services/ac.service';

interface IUser {
    id?: number;
    name?: string;
    token?: string;
    password?: string;
    email?: string;
    avatar?: string;
    access?: AccessRoles;
}

const users: IUser[] = [{
    id: 1,
    name: "John",
    email: "john@mail.com",
    password: "john123",
    access: AccessRoles.ADMIN
}, {
    id: 2,
    name: "Sarah",
    email: "sarah@mail.com",
    password: "sarah123",
    access: AccessRoles.USER
}];

export { users, IUser };