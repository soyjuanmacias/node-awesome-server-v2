import { Router } from 'express';
import config from '../config/index.js';
import Logger from '../loaders/logger.js';

import todos from './todos/todos.config.js';
import entities from './entities/entities.config.js';
import auth from './auth/auth.config.js';
import root from './root/root.config.js';


/**
 * Función encargada de cargar todas rutas de la API en el router del Framework
 * @param {*} app Framework (Express)
 * @param {*} prefix Prefijo de la versión de la API
 * @param {*} router Router del Framework
 */
const setRouter = (app, entityPrefix, router) => {
  app.use(`${config.api.prefix}${entityPrefix}`, router);
  Logger.info(`${entityPrefix} router loaded successfully`);
}

/**
 * Generador del router usado en la configuración en frameworkLoader
 * @param {*} app Framework (Express)
 * @returns router del Framework configurado con todas las rutas cargadas
 */
const routes = (app) => {
  const router = Router();
  setRouter(app, '/todos', todos);
  setRouter(app, '/entities', entities);
  setRouter(app, '/auth', auth);
  setRouter(app, '/', root);
  return router;
};

export default routes;