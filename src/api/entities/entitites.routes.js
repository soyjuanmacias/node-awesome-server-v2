import { validateCreateEntity, validateEditEntity } from "../middlewares/validators/entities.validators.js";


/**
 * Si se añaden nuevos métodos al controller (por herencia de la clase ControllerFactory)
 * se debe añadir la ruta correspondiente en este archivo en la propiedad controller como string
 */

const routes = [
  { path: '/', method: 'get', middlewares: [], controller: 'getAll' },
  { path: '/:id', method: 'get', middlewares: [], controller: 'getById' },
  { path: '/create', method: 'post', middlewares: [validateCreateEntity()], controller: 'create' },
  { path: '/:id/edit', method: 'put', middlewares: [validateEditEntity()], controller: 'edit' },
  { path: '/:id/delete', method: 'post', middlewares: [], controller: 'deleteOne' },
];

export default routes;
