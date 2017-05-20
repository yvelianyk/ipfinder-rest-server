import { AccessRoles } from './services/ac.service';

const routes = [
  // ---------------------------------------------
  // AUTH ROUTES:
  // ---------------------------------------------
  {
    "method": "post",
    "path": "/api/auth",
    "handler": "jwtAuth",
    "access": AccessRoles.ANY
  },
  {
    "method": "post",
    "path": "/api/auth/facebook",
    "handler": "facebookAuth",
    "access": AccessRoles.USER
  },
  // ---------------------------------------------
  // OTHER ROUTES:
  // ---------------------------------------------
  {
    "method": "get",
    "path": "/api/images",
    "handler": "getImages",
    "access": AccessRoles.ANY
  },
  {
    "method": "get",
    "path": "/api/user",
    "handler": "getCurrentUser",
    "access": AccessRoles.USER
  },
  {
    "method": "get",
    "path": "/api/users",
    "handler": "getUsers",
    "access": AccessRoles.ADMIN
  },
];

export { routes };