import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

/**
 * Si se añaden nuevos métodos al controller (por herencia de la clase ControllerFactory)
 * se debe añadir la ruta correspondiente en este archivo en la propiedad controller como string
 */

const routes = [
  { path: '/', method: 'get', middlewares: isAuth, controller: 'getAll' },
  { path: '/:id', method: 'get', middlewares: isAuth, controller: 'getById' },
  { path: '/create', method: 'post', middlewares: isAuth, controller: 'create' },
  { path: '/:id/edit', method: 'put', middlewares: isAuth, controller: 'edit' },
  { path: '/:id/delete', method: 'post', middlewares: isAdmin, controller: 'deleteOne' },
];

export default routes;
