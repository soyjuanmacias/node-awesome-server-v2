import { Schema, model } from 'mongoose';
import { RoutesFactory } from '../../factory/index.js';
import EntitiesController from './entities.controller.js';
import EntitiesDB from './entities.db.js';

import EntitiesService from './entities.service.js';

// modify scheme and routes to your duplicated folder
import schema from './entities.model.js';
import routes from './entitites.routes.js';

const schemaConfig = {
  timestamps: true,
}

// modify object values to new entity name
const entity = {
  name: 'Entidad',
  mongoName: 'entities',
  plural: 'todas las entidades',
  singular: 'la entidad',
};

/**
 * En este caso, vamos a 
 */
const Model = model(entity.mongoName, new Schema(schema, schemaConfig));
const Db = new EntitiesDB(Model, entity);
const Service = new EntitiesService(Db, entity);
const Controller = new EntitiesController(Service, entity);

export default RoutesFactory(routes, Controller);