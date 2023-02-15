import { isAuth } from "../middlewares/auth.middleware.js";
import { validateLogin, validateRegister } from "../middlewares/validators/auth.validators.js";

const routes = [
  { path: '/status', method: 'get', middlewares: [], controller: 'status' },
  { path: '/session', method: 'get', middlewares: [isAuth], controller: 'session' },
  { path: '/login', method: 'post', middlewares: validateLogin(), controller: 'login' },
  { path: '/register', method: 'post', middlewares: validateRegister(), controller: 'register' },
  { path: '/logout', method: 'post', middlewares: [], controller: 'logout' },
];

export default routes;
